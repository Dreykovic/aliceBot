import React, { useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import BgParticles from '@/components/ui/bg-particles';
import { Loading } from '@/components/ui/loading';
import useTelegramUser from '@/hooks/use-telegram-user';
import Layout from '@/layouts';
import routes from '@/routes';
import RoutesProvider from '@/routes/provider';
import { AppDispatch, RootState } from '@/stores';
import { useGetOrCreateClientMutation } from '@/stores/api-slice';
import { setUserState } from '@/stores/user-slice';
import { TelegramUser } from '@/types/api';
import Page404 from '@/components/ui/page-404';
import { Client } from '@/types/models-interfaces';

const MySwal = withReactContent(Swal);

const App: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<Client>();
  const [getOrCreateClient] = useGetOrCreateClientMutation();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useTelegramUser();

  const handleGetOrCreateClient = async (theCurrentUser: TelegramUser) => {
    const response = await getOrCreateClient({
      chat_id: theCurrentUser.id,
      nom: theCurrentUser.lastName,
      prenom: theCurrentUser.firstName,
      username: theCurrentUser.username,
    }).unwrap();
    return response;
  };
  const initUser = async () => {
    try {
      if (currentUser) {
        const response = await handleGetOrCreateClient(currentUser);

        const clientId = response.data.id;
        console.log('Id_client', response.data.id);
        console.log('Client Created', response);

        if (clientId) {
          dispatch(setUserState({ created: true, client: response.data }));
          setUser(response.data);
        } else {
          throw new Error('No client');
        }
      } else {
        throw new Error('No client');
      }
    } catch (error) {
      MySwal.fire({
        title: 'Erreur',
        text: `Une erreur est survenue lors du chargement`,
        icon: 'error',
        confirmButtonText: 'Réessayer',

        allowOutsideClick: false,
      });
    }
  };
  useEffect(() => {
    const initialize = async () => {
      if (!currentUser) return;
      await new Promise((resolve) => setTimeout(resolve, 3000)); // Ajoute un délai de 3 secondes
      await initUser();
      setLoading(false);
    };

    if (loading) {
      initialize();
    }
  }, [currentUser, loading]);

  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      {loading === false ? (
        user ? (
          <Layout>
            <RoutesProvider routes={routes} />
            <BgParticles />
          </Layout>
        ) : (
          <Layout>
            <Page404 />
            <BgParticles />
          </Layout>
        )
      ) : (
        <Loading />
      )}
    </ErrorBoundary>
  );
};

export default App;
