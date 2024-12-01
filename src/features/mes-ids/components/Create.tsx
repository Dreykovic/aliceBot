import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Bookmaker, ClientBookmaker } from '@/types/models-interfaces';

import BookmakerSelector from '@/components/bookmaker-picker';
import {
  useGetBookmakersQuery,
  useGetOrCreateClientMutation,
} from '@/stores/api-slice';
import { useCreateClientBookmakerMutation } from '../api';
import { TelegramUser } from '@/types/api';

const CreateClientBookmaker = ({
  closeModal,
  currentUser,
}: {
  closeModal: () => void;
  currentUser: TelegramUser;
}) => {
  const [isBookmakerSelectOpen, setIsBookmakerSelectOpen] = useState(false);

  const [bookmaker, setBookmaker] = useState<number>();
  const [identifiant, setIdentifiant] = useState<string>();
  // const [client, setClient] = useState<number>();

  const { data: BOOKMAKERS, isLoading: isBookmakersLoading } =
    useGetBookmakersQuery();

  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary ';
  const iconClasses = 'w-12 h-12 text-neutral-content p-1';
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [getOrCreateClient] = useGetOrCreateClientMutation();

  const [createClientBookmaker] = useCreateClientBookmakerMutation();
  const handleGetOrCreateClient = async (theCurrentUser: TelegramUser) => {
    const response = await getOrCreateClient({
      chat_id: theCurrentUser.id,
      nom: theCurrentUser.lastName,
      prenom: theCurrentUser.firstName,
      username: theCurrentUser.username,
    }).unwrap();
    return response;
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);

    const MySwal = withReactContent(Swal);

    try {
      let clientId: number;

      if (currentUser) {
        const response = await handleGetOrCreateClient(currentUser);
        // setClient(response.id);
        clientId = response.data.id;
        console.log('Id_client', response.data.id);
        console.log('Client Created', response);
        setIsLoading(true); // Commence le chargement

        if (clientId) {
          const data: ClientBookmaker = {
            identifiant: identifiant as string,
            bookmaker: bookmaker as number,
            client: clientId,
          };
          console.log(data);
          await createClientBookmaker(data).unwrap();

          MySwal.fire({
            title: 'Succès !',

            html: ` <div>
                      <h1>Enregistré avec succès</h1>
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

          setIdentifiant('');
          setBookmaker(undefined);
        } else {
          throw new Error('No client');
        }
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
          <Icon.Journals className={iconClasses} />
          <BookmakerSelector
            id="bookmaker"
            open={isBookmakerSelectOpen}
            onToggle={() => setIsBookmakerSelectOpen(!isBookmakerSelectOpen)}
            onChange={setBookmaker}
            selectedValue={
              BOOKMAKERS?.find((option) => option.id === bookmaker) as Bookmaker
            }
            dataArray={BOOKMAKERS}
            isLoading={isBookmakersLoading}
          />
        </div>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg bordered">
          <Icon.PersonBadge className={iconClasses} />
          <input
            type="text"
            id="identifiant"
            className={inputClasses}
            placeholder={'ID Compte'}
            value={identifiant || ''}
            onChange={(e) => setIdentifiant(e.target.value)}
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

export default CreateClientBookmaker;
