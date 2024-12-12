import './style.css';
import { motion, Variants } from 'framer-motion';
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';

import { setNavStatus } from '@/components/navigations/nav-slice';
import useBoundingClientRect from '@/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';
import { ClientBookmaker } from '@/types/models-interfaces';

import CLientBookmakerItem from './client-bookmaker-item';

const listVariants: Variants = {
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
};

const itemVariants: Variants = {
  visible: { opacity: 1, x: 0 },
  hidden: { opacity: 0, x: -100 },
};

type IdsDataType = {
  ids: ClientBookmaker[];
  isLoading?: boolean;
};

const Ids: React.FC<IdsDataType> = React.memo(({ ids }: IdsDataType) => {
  const { height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
  const [contentHeight, setContentHeight] = useState<number>(0);
  const dispatch = useDispatch<AppDispatch>();
  const [lastScrollTop, setLastScrollTop] = useState<number>(0);

  // Mémorisation de la fonction de scroll
  const handleScroll = useCallback(() => {
    if (ref.current) {
      const scrollTop = ref.current.scrollTop;
      if (scrollTop > lastScrollTop) {
        dispatch(setNavStatus({ status: 'HIDDEN' }));
      } else if (scrollTop < lastScrollTop) {
        dispatch(setNavStatus({ status: 'VISIBLE' }));
      }
      setLastScrollTop(scrollTop);
    }
  }, [lastScrollTop, dispatch, ref]);

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
  }, [height, rect, ref, handleScroll]);

  // Mémorisation de la liste des éléments à afficher
  const renderedIds = useMemo(
    () =>
      ids.map((IdsItem: ClientBookmaker, index: number) => {
        return (
          <motion.div key={index} variants={itemVariants}>
            <CLientBookmakerItem IdsItem={IdsItem} />
          </motion.div>
        );
      }),
    [ids],
  );

  return (
    <motion.div
      className="p-2 overflow-y-auto pb-2"
      initial="hidden"
      animate="visible"
      variants={listVariants}
      style={{ height: `${contentHeight}px` }}
      ref={ref}
    >
      {ids.length > 0 ? (
        renderedIds
      ) : (
        <div className="text-center">Aucune Id Enregistré</div>
      )}
    </motion.div>
  );
});
Ids.displayName = 'Ids';
export default Ids;
