import { useCallback, useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { AppDispatch, RootState } from '@/stores';

import { RetraitParrainage, useWithdrawReferralMutation } from '../api';
import useTelegramUser from '@/hooks/use-telegram-user';
import { useGetOrCreateClientMutation } from '@/stores/api-slice';
import { TelegramUser } from '@/types/api';
import { setUserState } from '@/stores/user-slice';

const WithdrawModal = ({ closeModal }: { closeModal: () => void }) => {
  const [montant, setMontant] = useState<number>();
  const [numero, setNumero] = useState<string>();
  // const [client, setClient] = useState<number>();
  const { client } = useSelector((state: RootState) => state.user);
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
  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary ';
  const iconClasses = 'w-12 h-12 text-neutral-content p-1';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [withdraw] = useWithdrawReferralMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const MySwal = withReactContent(Swal);

    try {
      if (client) {
        const data: RetraitParrainage = {
          numero_retrait: numero as string,
          montant_retrait: montant as number,
          client: client.id as number,
        };
        setIsLoading(true);
        await withdraw(data).unwrap();

        MySwal.fire({
          title: 'Succès !',

          html: ` <div>
                      <h1>Retrait Enregistré avec succès</h1>
                    </div>`,
          icon: 'success',

          background: '#938888',
          color: '#f9f9f9',
          didOpen: (alert) => {
            alert.onmouseenter = MySwal.stopTimer;
            alert.onmouseleave = MySwal.resumeTimer;
          },
          allowOutsideClick: false,
          timer: 10000,
          timerProgressBar: true,
          showCloseButton: true,
          showConfirmButton: false,
        });
        // Réinitialiser le formulaire après le succès

        setNumero('');
        setMontant(undefined);
        const { data: clientData } = await handleGetOrCreateClient(
          currentUser as TelegramUser,
        );
        console.log(clientData);

        if (!clientData?.id)
          throw new Error(
            'Erreur lors de la récupération de vos informations.',
          );

        dispatch(setUserState({ created: true, client: clientData }));
      } else {
        throw new Error('No client');
      }
    } catch (error) {
      MySwal.fire({
        title: 'Erreur',
        text: `Une erreur est survenue lors de l’enregistrement`,
        icon: 'error',
        confirmButtonText: 'Réessayer',

        allowOutsideClick: false,
      });
    } finally {
      setIsLoading(false); // Arrête le chargement, quelle que soit l'issue
      closeModal();
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg bordered">
          <Icon.Cash className={iconClasses} />
          <input
            type="number"
            id="montantId"
            className={inputClasses}
            placeholder={'Montant À Retirer'}
            value={montant || ''}
            onChange={(e) => setMontant(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg bordered">
          <Icon.PersonBadge className={iconClasses} />
          <input
            type="text"
            id="numero"
            className={inputClasses}
            placeholder={'Numéro De Retrait'}
            value={numero || ''}
            onChange={(e) => setNumero(e.target.value)}
          />
        </div>
        <div className="m-auto flex items-center">
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

export default WithdrawModal;
