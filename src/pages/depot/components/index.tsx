import React, { FormEventHandler, useEffect, useState } from 'react';
import {
  Cash,
  GlobeEuropeAfrica,
  Journals,
  KeyFill,
  PersonBadge,
  Wallet,
} from 'react-bootstrap-icons';

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
import { TelegramUser } from '@/shared/types/api';
import { Order } from '@/shared/types/forms-interfaces';
import {
  Bookmaker,
  Employee,
  PaymentMethod,
} from '@/shared/types/models-interfaces';
const user: TelegramUser = {
  id: '7332983362',
  firstName: 'Audrey',
  lastName: 'AMONA',
  username: 'Boss',
  photoUrl: 'string | null',
  languageCode: 'string',
};
const Form: React.FC = () => {
  // State variables
  const [country, setCountry] = useState<string>('TG');
  const [payment, setPayment] = useState<number>();
  const [bookmaker, setBookmaker] = useState<number>();
  const [caissier, setCaissier] = useState<number>();
  const [transaction, setTransaction] = useState<string>('');
  const [montant, setMontant] = useState<number | string>(''); // Initialize with an empty string
  const [client, setClient] = useState<number>();
  const currentUser: TelegramUser = useTelegramUser() ?? user;
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

  // Create or fetch client on component mount
  useEffect(() => {
    const createClient = async () => {
      try {
        const response = await getOrCreateClient({
          chat_id: currentUser.id,
        }).unwrap();
        setClient(response.id);
      } catch (error) {
        console.error('Error creating client:', error);
      }
    };
    createClient();
  }, [getOrCreateClient, currentUser.id]);

  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary';
  const iconClasses = 'w-12 h-12 text-neutral p-1';

  // Form submit handler
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const data: Order = {
      country,
      employee_payment_methode: caissier as number,
      is_depot: 'true',
      bookmaker_identifiant: bookmaker as number,
      transaction_id: transaction as string,
      montant: 500,
      client: client as number,
    };
    console.log(data);

    try {
      const response = await deposit(data).unwrap();
      console.log('Dépot effectué:', response);
    } catch (error) {
      console.error('Error Lors du depot:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <GlobeEuropeAfrica className="w-12 h-12 text-neutral p-1" />
        <CountrySelector
          id="countries"
          open={isCountrySelectorOpen}
          onToggle={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
          onChange={setCountry}
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

      {employeePaymentData && (
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
        <KeyFill className={iconClasses} />
        <input
          type="text"
          id="transactionId"
          className={inputClasses}
          placeholder="ID de transaction"
          value={transaction || ''}
          onChange={(e) => setTransaction(e.target.value)}
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <button
          className="btn-wide btn font-bold mb-6 rounded-btn"
          type="submit"
        >
          Soumettre
        </button>
      </div>
    </form>
  );
};

export default Form;
