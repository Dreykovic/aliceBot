import React, { useCallback, useState, useEffect } from 'react';
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
  const [code, setCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [updateClient] = useUpdateClientMutation();
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useTelegramUser();

  // Récupère le code de parrainage à chaque fois que "code" change, mais uniquement si "code" est non vide
  const { data: codeParrain, refetch } = useCheckCodeParrainQuery(
    { code },
    {
      skip: !code, // N'exécute la requête que si un code est saisi
      refetchOnMountOrArgChange: true,
    },
  );

  useEffect(() => {
    if (code) refetch(); // Recharger la vérification lorsque le code change
  }, [code, refetch]);

  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary';
  const iconClasses = 'w-12 h-12 text-neutral-content p-1';

  /**
   * Gère la mise à jour du client en envoyant le code parrain
   */
  const handleUpdateClient = useCallback(
    async (chat_id: string) => {
      try {
        const response = await updateClient({
          chat_id,
          codeparainageclient: codeParrain?.id as number,
        }).unwrap();

        return response;
      } catch (error) {
        console.error('Erreur lors de la mise à jour du client :', error);
        throw new Error('Impossible de mettre à jour vos informations.');
      }
    },
    [updateClient, codeParrain],
  );

  /**
   * Gère le processus de parrainage
   */
  const handleParrainage = useCallback(
    async (currentUser: TelegramUser) => {
      if (!codeParrain)
        throw new Error('Code de parrainage erroné ou inexistant.');

      const updateResponse = await handleUpdateClient(currentUser.id);
      if (!updateResponse?.id)
        throw new Error('Impossible de récupérer vos informations.');

      setUser((prevUser) => ({ ...prevUser, ...updateResponse }));
      dispatch(setUserState({ created: true, client: updateResponse }));
    },
    [dispatch, handleUpdateClient, code, codeParrain, setUser],
  );

  /**
   * Gère la soumission du formulaire de parrainage
   */
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!currentUser) throw new Error('Utilisateur introuvable.');

      await handleParrainage(currentUser);
      closeModal();
    } catch (error) {
      console.error('Erreur lors de l’enregistrement du parrainage :', error);
      await MySwal.fire({
        title: 'Erreur',
        text: `Une erreur est survenue : ${(error as Error).message}`,
        icon: 'error',
        confirmButtonText: 'Réessayer',
        allowOutsideClick: false,
      });
    } finally {
      setIsLoading(false);
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
            placeholder="Entrez le code de parrainage"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className="m-auto flex items-center">
          <button
            className="btn btn-secondary m-auto"
            type="reset"
            onClick={closeModal}
          >
            Annuler
          </button>

          <button
            className={`btn btn-primary m-auto ${isLoading ? 'loading loading-spinner text-warning' : ''}`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Chargement...' : 'Enregistrer'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CheckParrainModal;
