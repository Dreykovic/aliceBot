import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPageTitle, setPageType } from '@/components/header/header-slice';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch, RootState } from '@/stores';
import Modal from 'react-modal';
import WithdrawModal from './components/create';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const Parrainage: React.FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const dispatch = useDispatch<AppDispatch>();
  const { client } = useSelector((state: RootState) => state.user);
  const montant = parseFloat(client?.montant_parainage_depot as string) ?? 0;
  // const montant = 30000;
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
                  onClick={openModal}
                  aria-disabled={montant < 2000 ? 'true' : undefined}
                >
                  Retirer
                </button>
              </div>
            </div>
          </div>
          <div role="alert" className="alert alert-info">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              Retrait disponible uniquement lorsque le solde de parrainage est
              supérieur ou égale à 2000.
            </span>
          </div>
        </div>{' '}
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Créer une id de bookMaker"
      >
        <WithdrawModal closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default Parrainage;
