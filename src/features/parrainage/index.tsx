import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPageTitle, setPageType } from '@/components/header/header-slice';

import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch, RootState } from '@/stores';

const Parrainage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useSelector((state: RootState) => state.user);
  const montant = parseFloat(client?.montant_parainage_depot as string) ?? 0;
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    // if (width >= 1024) {
    //   navigate('/');
    // }

    dispatch(setPageTitle({ title: 'Parrainage' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);
  return (
    <>
      {/* {contentHeight} /{height} /{rect?.top} */}
      <div className="my-2 text-base-300 shadow-md flex flex-col items-center gap-5 p-3 h-full">
        <div className="card bg-ternary text-primary-content w-96">
          <div className="card-body">
            <div className="stat">
              <div className="stat-title">Montant Total de parrainage</div>
              <div className="stat-value">{`${montant}  FCFA`}</div>
              <div className="stat-actions">
                <button
                  className={`btn btn-${montant < 2000 ? 'disabled' : 'sm'}`}
                  tabIndex={-1}
                  role="button"
                  aria-disabled={montant < 2000 ? 'true' : undefined}
                >
                  Retirer
                </button>
              </div>
            </div>
          </div>
        </div>{' '}
      </div>
    </>
  );
};

export default Parrainage;
