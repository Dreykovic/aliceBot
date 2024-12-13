import React, { useCallback, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { AppDispatch } from '@/stores';

import {
  useCheckCodeParrainQuery,
  useUpdateClientMutation,
} from '@/stores/api-slice';
import { TelegramUser } from '@/types/api';
import { Client } from '@/types/models-interfaces';
import { setUserState } from '@/stores/user-slice';
import useTelegramUser from '@/hooks/use-telegram-user';
const MySwal = withReactContent(Swal);

const CheckParrainModal = ({
  closeModal,
  setUser,
}: {
  closeModal: () => void;
  setUser: React.Dispatch<React.SetStateAction<Client | null>>;
}) => {
  const [code, setCode] = useState<string>();
  // const [client, setClient] = useState<number>();
  const [updateClient] = useUpdateClientMutation();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useTelegramUser();

  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary ';
  const iconClasses = 'w-12 h-12 text-neutral-content p-1';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: codeParrain } = useCheckCodeParrainQuery(
    {
      code: code,
    },
    {
      skip: !code,
      refetchOnMountOrArgChange: true,
    },
  );

  const handleParrainage = useCallback(
    async (currentUser: TelegramUser) => {
      try {
        if (codeParrain) {
          const updateResponse = await handleUpdateClient(currentUser.id);
          if (!updateResponse?.id)
            throw new Error(
              'Erreur lors de la récupération de vos informations.',
            );
          setUser((prevUser) => ({ ...prevUser, ...updateResponse }));
          dispatch(setUserState({ created: true, client: updateResponse }));
          await MySwal.fire({
            text: `Code de parrainage "${code}" ajouté à votre compte.`,
            allowOutsideClick: false,
            timer: 10000,
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
          });
        } else {
          throw Error('Code parrain erroné');
        }
      } catch (error) {
        console.error('Erreur de parrainage :', error);
        throw Error((error as any).message);
      }
    },
    [dispatch],
  );
  const handleUpdateClient = useCallback(
    async (chat_id: string) => {
      try {
        const response = await updateClient({
          chat_id,
          codeparainageclient: String(codeParrain.id),
        }).unwrap();
        return response;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du client :', error);
        throw error;
      }
    },
    [updateClient],
  );
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const MySwal = withReactContent(Swal);

    try {
      console.log('GO');

      if (currentUser) {
        setIsLoading(true);
        console.log('GP');

        await handleParrainage(currentUser);
      } else {
        throw new Error('No client');
      }
    } catch (error) {
      MySwal.fire({
        title: 'Erreur',
        text: `Une erreur est survenue lors de l’enregistrement ${(error as any).message}`,
        icon: 'error',
        confirmButtonText: 'Réessayer',

        allowOutsideClick: false,
      });
    } finally {
      console.log('G');

      setIsLoading(false); // Arrête le chargement, quelle que soit l'issue
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg bordered">
          <Icon.Code className={iconClasses} />
          <input
            type="text"
            id="codeId"
            className={inputClasses}
            placeholder={'Entrez le code de parrainage'}
            value={code || ''}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="m-auto flex items-center">
          <button
            className={`btn btn-secondary m-auto `}
            type="reset"
            onClick={closeModal}
          >
            Annuler
          </button>
          <button
            className={`btn btn-primary m-auto ${isLoading ? 'loading loading-spinner text-warning' : ''}`}
            type="submit"
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckParrainModal;
