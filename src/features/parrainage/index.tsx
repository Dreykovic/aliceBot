import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setPageTitle, setPageType } from '@/components/header/header-slice';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch, RootState } from '@/stores';
import Modal from 'react-modal';
import WithdrawModal from './components/create';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';

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
const MySwal = withReactContent(Swal);

const Parrainage: React.FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal(e: any) {
    e.stopPropagation();
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
  const showMessage = async () => {
    if (montant < 2000) {
      await MySwal.fire({
        text: `Retrait disponible uniquement lorsque le solde de parrainage est upérieur ou égale à 2000.`,
        allowOutsideClick: false,
        timer: 10000,
        timerProgressBar: true,
        showCloseButton: true,
        showConfirmButton: false,
      });
    }
  };
  return (
    <>
      {/* {contentHeight} /{height} /{rect?.top} */}
      <div className="my-2 text-base-300 shadow-md flex flex-col items-center gap-5 p-3 h-full">
        <div className="card bg-ternary text-primary-content w-96">
          <div className="card-body">
            <div className="stat">
              <div className="stat-title">Montant Total de parrainage</div>
              <div className="stat-value">{`${montant}  FCFA`}</div>
              <div className="stat-actions " onClick={showMessage}>
                <button
                  className={`btn btn-${montant < 2000 ? 'disabled' : 'sm'} tooltip`}
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
