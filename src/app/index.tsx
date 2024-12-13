import React, { useEffect, useState, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Modal from 'react-modal';

import BgParticles from '@/components/ui/bg-particles';
import { Loading } from '@/components/ui/loading';
import Page404 from '@/components/ui/page-404';
import useTelegramUser from '@/hooks/use-telegram-user';
import Layout from '@/layouts';
import routes from '@/routes';
import RoutesProvider from '@/routes/provider';
import { AppDispatch } from '@/stores';
import { useGetOrCreateClientMutation } from '@/stores/api-slice';
import { setUserState } from '@/stores/user-slice';
import { TelegramUser } from '@/types/api';
import { Client } from '@/types/models-interfaces';
import CheckParrainModal from './checkParrain';

const MySwal = withReactContent(Swal);
const swalForParrainage = MySwal.mixin({
  allowOutsideClick: false,
  allowEscapeKey: false,
  showCancelButton: true,
});
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
const App: React.FC = () => {
  const [user, setUser] = useState<Client | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [getOrCreateClient] = useGetOrCreateClientMutation();

  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useTelegramUser();

  const handleGetOrCreateClient = useCallback(
    async (theCurrentUser: TelegramUser) => {
      try {
        const response = await getOrCreateClient({
          chat_id: theCurrentUser.id,
          nom: theCurrentUser.lastName,
          prenom: theCurrentUser.firstName,
          username: theCurrentUser.username,
        }).unwrap();
        return response;
      } catch (error) {
        console.error(
          'Erreur lors de la création ou de la récupération du client :',
          error,
        );
        throw error;
      }
    },
    [getOrCreateClient],
  );

  const handleParrainage = useCallback(async () => {
    try {
      const { isConfirmed } = await swalForParrainage.fire({
        title: 'Parrainage',
        icon: 'question',
        text: 'Voulez-vous utiliser un code de parrainage ?',
        confirmButtonText: 'Oui',
        cancelButtonText: 'Non',
        reverseButtons: true,
      });

      if (!isConfirmed) return;
      openModal();
    } catch (error) {
      console.error('Erreur de parrainage :', error);
    }
  }, [dispatch]);

  const initUser = useCallback(async () => {
    if (!currentUser) {
      console.error('Utilisateur introuvable.');
      return;
    }

    try {
      const { data: clientData, created } =
        await handleGetOrCreateClient(currentUser);
      console.log(clientData);

      if (!clientData?.id)
        throw new Error('Erreur lors de la récupération de vos informations.');

      setUser(clientData as Client);
      dispatch(setUserState({ created: true, client: clientData }));
      if (created) {
        await handleParrainage();
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'initialisation de l'utilisateur :",
        error,
      );
      MySwal.fire({
        title: 'Erreur',
        text: 'Une erreur est survenue lors du chargement.',
        icon: 'error',
        confirmButtonText: 'Réessayer',
        allowOutsideClick: false,
      });
    }
  }, [currentUser, handleGetOrCreateClient, handleParrainage, dispatch]);

  useEffect(() => {
    if (!isInitialized && currentUser) {
      setIsInitialized(true);
      initUser();
    }
  }, [currentUser, isInitialized, initUser]);

  if (!user) return <Loading />;

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {user ? (
        <Layout>
          <RoutesProvider routes={routes} />
          <BgParticles />
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Ajouter Code Parrain"
            shouldCloseOnOverlayClick={false} // add this to prevent outside click to prevent modal close
          >
            <CheckParrainModal closeModal={closeModal} setUser={setUser} />
          </Modal>
        </Layout>
      ) : (
        <Layout>
          <Page404 />
          <BgParticles />
        </Layout>
      )}
    </ErrorBoundary>
  );
};

export default React.memo(App);
