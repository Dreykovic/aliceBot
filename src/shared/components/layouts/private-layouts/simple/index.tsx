import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Header from '@/shared/components/layouts/partials/header';
import Navigations from '@/shared/components/layouts/partials/navigations';
import RightSidebar from '@/shared/components/layouts/partials/right-sidebar';
import useBoundingClientRect from '@/shared/hooks/use-bounding-client-rect';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { RootState } from '@/stores';

type Props = {
  children: ReactNode;
};
function SimplePrivateLayout(props: Props) {
  const { pageTitle } = useSelector((state: RootState) => state.header);

  // const dispatch = useDispatch<AppDispatch>();

  const { width, height } = useWindowDimensions();
  const [rect, ref] = useBoundingClientRect<HTMLDivElement>();
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (rect) {
      setContentHeight(height - rect.top);
    }
    // dispatch(setPageType({ type: 'simple' }));
  }, [width, height, rect]);

  return (
    <>
      {/* Left drawer - containing page content and side bar (always open) */}
      <div className="bg-base-300 overflow-hidden" style={{ height }}>
        <div className="h-full  relative w-full bg-neutral overflow-auto">
          <main>
            <Header />
            <div
              ref={ref}
              style={{ height: `${contentHeight}px` }}
              className="overflow-hidden"
            >
              {props.children}
            </div>
          </main>
        </div>
      </div>
      {/* <Navigations position="bottom" /> */}
      {pageTitle === 'Profile' || pageTitle === 'Historique' ? (
        <Navigations />
      ) : (
        ''
      )}
      {/* Right drawer - containing secondary content like notifications list etc.. */}
      <RightSidebar />
    </>
  );
}

export default SimplePrivateLayout;
