import React, { MutableRefObject, useEffect, useState } from 'react';
import { BoxArrowInDown } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setPageTitle,
  setPageType,
} from '@/shared/components/layouts/partials/header/header-slice';
import Subtitle from '@/shared/components/ui/Typography/subtitle';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

import Form from './components';
import useBoundingClientRect from '@/shared/hooks/use-bounding-client-rect';
import { setNavStatus } from '@/shared/components/layouts/partials/navigations/nav-slice';

const Depot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    // if (width >= 1024) {
    //   navigate('/');
    // }

    dispatch(setPageTitle({ title: 'Depot' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);
  const { height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
  const [contentHeight, setContentHeight] = useState<number>(0);

  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  const handleScroll = () => {
    if (ref.current) {
      const scrollTop = ref.current.scrollTop;
      if (scrollTop > lastScrollTop) {
        dispatch(setNavStatus({ status: 'HIDDEN' }));
      } else if (scrollTop < lastScrollTop) {
        dispatch(setNavStatus({ status: 'VISIBLE' }));
      }
      setLastScrollTop(scrollTop);
    }
  };

  useEffect(() => {
    if (rect) {
      setContentHeight(height - rect.top);
    }
    const scrollDiv = ref.current;
    if (scrollDiv) {
      scrollDiv.addEventListener('scroll', handleScroll);

      return () => {
        scrollDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollTop, height, rect, ref]);
  return (
    <>
      <div
        className="p-4 overflow-auto h-full text-neutral-content"
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        <div className="w-full p- m-auto  ">
          <header>
            <div className="my-2 flex justify-between items-center flex-col text-neutral-content">
              <BoxArrowInDown className="w-12 h-12" />
              <Subtitle className="">{'Depot'}</Subtitle>
            </div>
          </header>
          <Form />
        </div>
      </div>
    </>
  );
};

export default Depot;
