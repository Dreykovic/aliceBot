import React, { useEffect, useState, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import BgParticles from '@/components/ui/bg-particles';
import { Loading } from '@/components/ui/loading';
import useTelegramUser from '@/hooks/use-telegram-user';
import Layout from '@/layouts';
import routes from '@/routes';
import RoutesProvider from '@/routes/provider';
import { AppDispatch } from '@/stores';
import {
  useGetOrCreateClientMutation,
  useUpdateClientMutation,
} from '@/stores/api-slice';
import { setUserState } from '@/stores/user-slice';
import Page404 from '@/components/ui/page-404';
import { Client } from '@/types/models-interfaces';
import { TelegramUser } from '@/types/api';

const MySwal = withReactContent(Swal);
const swalForParrainage = MySwal.mixin({
  allowOutsideClick: false,
  allowEscapeKey: false,
  showCancelButton: true,
});

const App: React.FC = () => {
  const [user, setUser] = useState<Client | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [getOrCreateClient] = useGetOrCreateClientMutation();
  const [updateClient] = useUpdateClientMutation();
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

  const handleUpdateClient = useCallback(
    async (chat_id: string, codeparainageclient: string) => {
      try {
        const response = await updateClient({
          chat_id,
          codeparainageclient,
        }).unwrap();
        return response;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du client :', error);
        throw error;
      }
    },
    [updateClient],
  );

  const handleParrainage = useCallback(
    async (currentUser: TelegramUser) => {
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

        const { value: code_parrainage } = await swalForParrainage.fire({
          title: 'Entrez le code de parrainage',
          input: 'text',
          inputLabel: 'Code',
          inputValidator: (value) =>
            !value ? 'Vous devez écrire le code de parrainage !' : undefined,
          confirmButtonText: 'Valider',
          cancelButtonText: 'Annuler',
        });

        if (code_parrainage) {
          const updateResponse = await handleUpdateClient(
            currentUser.id,
            code_parrainage,
          );
          if (!updateResponse?.id)
            throw new Error(
              'Erreur lors de la récupération de vos informations.',
            );
          setUser((prevUser) => ({ ...prevUser, ...updateResponse }));
          dispatch(setUserState({ created: true, client: updateResponse }));
          await MySwal.fire({
            text: `Code de parrainage "${code_parrainage}" ajouté à votre compte.`,
            allowOutsideClick: false,
            timer: 10000,
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
          });
        }
      } catch (error) {
        console.error('Erreur de parrainage :', error);
      }
    },
    [handleUpdateClient],
  );

  const initUser = useCallback(async () => {
    if (!currentUser) {
      console.error('Utilisateur introuvable.');
      return;
    }

    try {
      const { data: clientData } = await handleGetOrCreateClient(currentUser);
      if (!clientData?.id)
        throw new Error('Erreur lors de la récupération de vos informations.');

      setUser(clientData as Client);
      dispatch(setUserState({ created: true, client: clientData }));
      if (!isInitialized) {
        await handleParrainage(currentUser);
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
  }, [
    currentUser,
    handleGetOrCreateClient,
    handleParrainage,
    dispatch,
    isInitialized,
  ]);

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
