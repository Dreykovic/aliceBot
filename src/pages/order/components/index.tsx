import React, { FormEventHandler, useState } from 'react';
import {
  Cash,
  GlobeEuropeAfrica,
  Journals,
  KeyFill,
  PersonBadge,
  PhoneFill,
  Wallet,
} from 'react-bootstrap-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ALICE from '@/assets/images/alice.png';

import BookmakerSelector from '@/shared/components/common/bookmaker-picker';
import EmployeeSelector from '@/shared/components/common/employee-picker';
import PaymentSelector from '@/shared/components/common/payment-method-picker';
import { COUNTRIES } from '@/shared/components/ui/country-picker/lib/countries';
import CountrySelector from '@/shared/components/ui/country-picker/lib/selector';
import { SelectMenuOption } from '@/shared/components/ui/country-picker/lib/types';
import useTelegramUser from '@/shared/hooks/use-telegram-user';
import {
  useDepositMutation,
  useGetBookmakersQuery,
  useGetCaissierByPMAndBookmakerQuery,
  useGetEmployeePaymentMethodQuery,
  useGetOrCreateClientMutation,
  useGetPaymentMethodsQuery,
} from '@/shared/services/api';
import { Order } from '@/shared/types/forms-interfaces';
import {
  Bookmaker,
  Employee,
  PaymentMethod,
} from '@/shared/types/models-interfaces';

type FormPropsType = {
  order_type: 'RETRAIT' | 'DEPOT';
};
const Form: React.FC<FormPropsType> = (prop: FormPropsType) => {
  // State variables
  const [country, setCountry] = useState<string>('TG');
  const [payment, setPayment] = useState<number>();
  const [bookmaker, setBookmaker] = useState<number>();
  const [account, setAccount] = useState<number | string>('');
  const [caissier, setCaissier] = useState<number>();
  const [transaction, setTransaction] = useState<string>('');
  const [contact, setContact] = useState<string>('');
  const [montant, setMontant] = useState<number | string>(''); // Initialize with an empty string
  const [client, setClient] = useState<number>();
  const currentUser = useTelegramUser();
  console.log(currentUser);

  const [isPaymentSelectOpen, setIsPaymentSelectOpen] = useState(false);
  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  const [isBookmakerSelectOpen, setIsBookmakerSelectOpen] = useState(false);
  const [isCaissierSelectOpen, setIsCaissierSelectOpen] = useState(false);

  // Fetch data from the API
  const { data: PAYMENTS, isLoading: isPaymentsLoading } =
    useGetPaymentMethodsQuery();
  const { data: BOOKMAKERS, isLoading: isBookmakersLoading } =
    useGetBookmakersQuery();

  const { data: caissiersData, isLoading: isCaissierLoading } =
    useGetCaissierByPMAndBookmakerQuery(
      {
        bookmaker_id: bookmaker as number,
        payment_method_id: payment as number,
      },
      { skip: !payment || !bookmaker, refetchOnMountOrArgChange: true },
    );

  const caissiers = caissiersData || [];
  const isCaissierDisabled = !payment || !bookmaker;

  const { data: employeePaymentData } = useGetEmployeePaymentMethodQuery(
    {
      employee_id: caissier as number,
      bookmaker_id: bookmaker as number,
      payment_method_id: payment as number,
    },
    {
      skip: !payment || !bookmaker || !caissier,
      refetchOnMountOrArgChange: true,
    },
  );

  const [getOrCreateClient] = useGetOrCreateClientMutation();
  const [deposit] = useDepositMutation();

  // // Create or fetch client on component mount
  // useEffect(() => {
  //   const createClient = async () => {
  //     try {
  //       const response = await getOrCreateClient({
  //         chat_id: currentUser.id,
  //         country: country || 'TG',
  //       }).unwrap();
  //       setClient(response.id);
  //       console.log('Id_client', response.id);
  //     } catch (error) {
  //       // console.error('Error creating client:', error);
  //     }
  //   };
  //   createClient();
  // }, [getOrCreateClient, currentUser.id]);

  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary';
  const iconClasses = 'w-12 h-12 text-neutral p-1';
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Form submit handler
  const handleCountryCHange = async (value: string) => {
    setCountry(value);
    try {
      if (currentUser) {
        const response = await getOrCreateClient({
          chat_id: currentUser.id,
          country: country || 'TG',
        }).unwrap();
        setClient(response.id);
        console.log('Id_client', response.id);
      } else {
        throw new Error('No client');
      }
    } catch (error) {
      console.log('error');
    }
  };

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const MySwal = withReactContent(Swal);

    try {
      let clientId: number;
      if (currentUser) {
        const response = await getOrCreateClient({
          chat_id: currentUser.id,
          country: country || 'TG',
        }).unwrap();
        setClient(response.id);
        clientId = response.id;
        console.log('Id_client', response.id);

        setIsLoading(true); // Commence le chargement
        if (clientId) {
          const data: Order = {
            employee_payment_method: caissier as number,
            order_type: prop.order_type,
            bookmaker_identifiant: account as number,
            reference_id: transaction as string,
            montant: montant as number,
            client: clientId,
            contact: contact,
          };

          console.log(client);

          const result = await deposit(data).unwrap();
          console.log(`${prop.order_type} effectué:`, result);

          MySwal.fire({
            title: 'Succès !',

            html: ` <div>
                      <h1>${prop.order_type} pris en compte et sera traité dans les plus bref délais !!!</h1>
                      <img src=${ALICE} alt="" />
                    </div>`,
            icon: 'success',
            timer: 3000,
            background: '#938888',
            color: '#f9f9f9',
            didOpen: (alert) => {
              alert.onmouseenter = MySwal.stopTimer;
              alert.onmouseleave = MySwal.resumeTimer;
            },
            allowOutsideClick: false,
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
          });
          // Réinitialiser le formulaire après le succès
          setCountry('TG');
          setPayment(undefined);
          setBookmaker(undefined);
          setCaissier(undefined);
          setTransaction('');
          setMontant('');
          setAccount('');
          setContact('');
        } else {
          throw new Error('No client');
        }
      } else {
        throw new Error('No client');
      }
    } catch (error) {
      console.error(`Error Lors du ${prop.order_type}:`, error);
      MySwal.fire({
        title: 'Erreur',
        text: `Une erreur est survenue lors du ${prop.order_type}. ${(error as any).message}`,
        icon: 'error',
        confirmButtonText: 'Réessayer',

        allowOutsideClick: false,
      });
    } finally {
      setIsLoading(false); // Arrête le chargement, quelle que soit l'issue
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <GlobeEuropeAfrica className="w-12 h-12 text-neutral p-1" />
        <CountrySelector
          id="countries"
          open={isCountrySelectorOpen}
          onToggle={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
          onChange={handleCountryCHange}
          selectedValue={
            COUNTRIES.find(
              (option) => option.value === country,
            ) as SelectMenuOption
          }
        />
      </div>

      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <Wallet className="w-12 h-12 text-neutral p-1" />
        <PaymentSelector
          id="payment"
          open={isPaymentSelectOpen}
          onToggle={() => setIsPaymentSelectOpen(!isPaymentSelectOpen)}
          onChange={setPayment}
          selectedValue={
            PAYMENTS?.find((option) => option.id === payment) as PaymentMethod
          }
          dataArray={PAYMENTS}
          isLoading={isPaymentsLoading}
        />
      </div>

      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <Journals className="w-12 h-12 text-neutral p-1" />
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
      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <Cash className={iconClasses} />
        <input
          type="number"
          id="transactionId"
          className={inputClasses}
          placeholder="Montant"
          value={montant || ''}
          onChange={(e) => setMontant(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <PersonBadge className="w-12 h-12 text-neutral p-1" />
        <EmployeeSelector
          id="caissier"
          open={isCaissierSelectOpen}
          onToggle={() => setIsCaissierSelectOpen(!isCaissierSelectOpen)}
          onChange={setCaissier}
          selectedValue={
            caissiers?.find((option) => option.id === caissier) as Employee
          }
          dataArray={caissiers}
          isLoading={isCaissierLoading}
          disabled={isCaissierDisabled}
        />
      </div>

      {employeePaymentData && prop.order_type === 'DEPOT' && (
        <div role="alert" className="alert alert-info mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="h-6 w-6 shrink-0 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{`Tapez : ${employeePaymentData?.syntaxe}, puis entrez l'id de votre transaction ci-dessous`}</span>
        </div>
      )}
      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <PersonBadge className={iconClasses} />
        <input
          type="text"
          id="accountId"
          className={inputClasses}
          placeholder={'ID Compte'}
          value={account || ''}
          onChange={(e) => setAccount(Number(e.target.value))}
        />
      </div>
      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <KeyFill className={iconClasses} />
        <input
          type="text"
          id="transactionId"
          className={inputClasses}
          placeholder={
            prop.order_type === 'DEPOT' ? 'Référence' : 'Code Retrait'
          }
          value={transaction || ''}
          onChange={(e) => setTransaction(e.target.value)}
        />
      </div>
      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <PhoneFill className={iconClasses} />
        <input
          type="text"
          id="contactId"
          className={inputClasses}
          placeholder="Contact"
          value={contact || ''}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className="w-full flex items-center justify-center flex-shrink">
        <button
          className="btn-wide btn font-bold mb-6 rounded-btn"
          type="submit"
          disabled={isLoading} // Désactive le bouton lorsque isLoading est true
        >
          {isLoading ? (
            <span className="loading loading-spinner text-warning loading-md"></span> // Spinner en cours de chargement
          ) : (
            'Soumettre'
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
