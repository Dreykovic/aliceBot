import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Icon from 'react-bootstrap-icons';
import Modal from 'react-modal';

import { setPageTitle, setPageType } from '@/components/header/header-slice';
Modal.setAppElement('#root');

import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

import Ids from './components';
import CreateClientBookmaker from './components/Create';
import { useGetClientBookmakersListQuery } from './api';
import useTelegramUser from '@/hooks/use-telegram-user';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 0%)',
  },
};
const MesIds: React.FC = () => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    // if (width >= 1024) {
    //   navigate('/');
    // }

    dispatch(setPageTitle({ title: 'Mes Ids' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);
  const currentUser = useTelegramUser();

  const { data: idsList, isLoading } = useGetClientBookmakersListQuery(
    {
      chat_id: currentUser?.id as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  return (
    <>
      <div className="p-4 overflow-hidden h-full">
        <div className="flex my-1 p-1 text-base-300 justify-between items-center ">
          <label className="input input-bordered flex items-center gap-2">
            <Icon.Search className="w-4 h-4" />

            <input type="text" className="grow" placeholder="Recherche" />
          </label>

          <button className="btn btn-square btn-secondary" onClick={openModal}>
            <Icon.PlusCircle className="w-6 h-6" />
          </button>
        </div>

        {isLoading ? (
          <div className="w-full    flex items-center justify-center">
            <span className="loading loading-spinner text-primary loading-lg"></span>
          </div>
        ) : (
          <Ids ids={idsList ?? []} />
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Créer une id de bookMaker"
      >
        {currentUser ? (
          <CreateClientBookmaker
            closeModal={closeModal}
            currentUser={currentUser}
          />
        ) : (
          'Une erreur est survenue'
        )}
      </Modal>
    </>
  );
};

export default MesIds;
