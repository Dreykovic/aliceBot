import React, { MutableRefObject, useEffect, useState } from 'react';
import { BoxArrowDown, BoxArrowUp } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';

import { setPageTitle, setPageType } from '@/components/header/header-slice';
import { setNavStatus } from '@/components/navigations/nav-slice';
import Subtitle from '@/components/ui/Typography/subtitle';
import useBoundingClientRect from '@/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

import Form from './components/form';

type OrderPropsType = {
  title: 'Dépôt' | 'Retrait';
  type: 'RETRAIT' | 'DEPOT';
};
const Order: React.FC<OrderPropsType> = (prop: OrderPropsType) => {
  const dispatch = useDispatch<AppDispatch>();

  const { height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();

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
    dispatch(setPageTitle({ title: prop.title }));
    dispatch(setPageType({ type: 'main' }));
    const scrollDiv = ref.current;
    if (scrollDiv) {
      scrollDiv.addEventListener('scroll', handleScroll);

      return () => {
        scrollDiv.removeEventListener('scroll', handleScroll);
      };
    }
  }, [lastScrollTop, height, rect, ref, prop.title, dispatch]);
  return (
    <>
      <div
        className="p-4 overflow-auto h-full text-neutral-content  "
        ref={ref as MutableRefObject<HTMLDivElement>}
      >
        <div className="w-full p- m-auto   ">
          <header>
            <div className="my-2 flex justify-between items-center flex-col text-neutral-content">
              {prop.type === 'DEPOT' ? (
                <BoxArrowDown className="w-12 h-12" />
              ) : (
                <BoxArrowUp className="w-12 h-12" />
              )}

              <Subtitle className="">{prop.title}</Subtitle>
            </div>
          </header>
          <Form order_type={prop.type} />
        </div>
      </div>
    </>
  );
};

export default Order;
