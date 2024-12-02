import React, { useEffect } from 'react';
import * as Icon from 'react-bootstrap-icons';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPageTitle, setPageType } from '@/components/header/header-slice';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch, RootState } from '@/stores';
import { useGetClientBookmakersListQuery } from './api';
import Ids from './components';
import CreateClientBookmaker from './components/Create';
Modal.setAppElement('#root');

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
  const [search, setSearch] = React.useState('');

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

  const { client } = useSelector((state: RootState) => state.user);
  const { data: idsList, isLoading } = useGetClientBookmakersListQuery(
    {
      chat_id: client?.id_chat as string,
    },
    {
      refetchOnMountOrArgChange: true,
    },
  );
  return (
    <>
      <div className="p-4 overflow-hidden h-full">
        <div className="grid grid-cols-4 my-1  text-base-300 justify-between items-center gap-1 flex-wrap">
          <label className="col-span-5 input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Recherche"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Icon.Search className="w-4 h-4" />
          </label>

          <button
            className="col-end-12  btn btn-square btn-secondary "
            onClick={openModal}
          >
            <Icon.PlusCircle className="w-6 h-6" />
          </button>
        </div>

        {isLoading ? (
          <div className="w-full    flex items-center justify-center">
            <span className="loading loading-spinner text-primary loading-lg"></span>
          </div>
        ) : (
          <Ids
            ids={
              idsList?.filter((idsItem) =>
                idsItem.identifiant
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ) ?? []
            }
          />
        )}
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Créer une id de bookMaker"
      >
        <CreateClientBookmaker closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default MesIds;
