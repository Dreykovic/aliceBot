import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import { Bookmaker, ClientBookmaker } from '@/types/models-interfaces';

import BookmakerSelector from '@/components/bookmaker-picker';
import { useGetBookmakersQuery } from '@/stores/api-slice';
import { useCreateClientBookmakerMutation } from '../api';
import { TelegramUser } from '@/types/api';
import { RootState } from '@/stores';
import { useSelector } from 'react-redux';

const CreateClientBookmaker = ({ closeModal }: { closeModal: () => void }) => {
  const [isBookmakerSelectOpen, setIsBookmakerSelectOpen] = useState(false);

  const [bookmaker, setBookmaker] = useState<number>();
  const [identifiant, setIdentifiant] = useState<string>();
  // const [client, setClient] = useState<number>();
  const { client } = useSelector((state: RootState) => state.user);

  const { data: BOOKMAKERS, isLoading: isBookmakersLoading } =
    useGetBookmakersQuery();

  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary ';
  const iconClasses = 'w-12 h-12 text-neutral-content p-1';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [createClientBookmaker] = useCreateClientBookmakerMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(e);

    const MySwal = withReactContent(Swal);

    try {
      if (client) {
        const data: Partial<ClientBookmaker> = {
          identifiant: identifiant as string,
          bookmaker: bookmaker as number,
          client: client.id,
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
