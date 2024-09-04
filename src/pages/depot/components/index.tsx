import React, { useState } from 'react';
import {
  GlobeEuropeAfrica,
  Journals,
  KeyFill,
  PersonBadge,
  Wallet,
} from 'react-bootstrap-icons';

import BookmakerSelector from '@/shared/components/common/bookmaker-picker';
import MyCountrySelector from '@/shared/components/ui/country-picker';
import PaymentSelector from '@/shared/components/common/payment-method-picker';
import EmployeeSelector from '@/shared/components/common/employe-picker';

import {
  useGetBookmakersQuery,
  useGetCaissierByPMAndBookmakerQuery,
  useGetPaymentMethodsQuery,
} from '@/shared/services/api';

import {
  Bookmaker,
  Employee,
  PaymentMethod,
} from '@/shared/types/models-interfaces';

const Form: React.FC = () => {
  const [isPaymentSelectOpen, setIsPaymentSelectOpen] = useState(false);
  const [payment, setPayment] = useState<string>();
  const { data: PAYMENTS, isLoading: isPaymentsLoading } =
    useGetPaymentMethodsQuery();

  const [isBookmakerSelectOpen, setIsBookmakerSelectOpen] = useState(false);
  const [bookmaker, setBookmaker] = useState<number>();
  const { data: BOOKMAKERS, isLoading: isBookmakersLoading } =
    useGetBookmakersQuery();

  // Utilisation du hook directement dans le composant
  const { data: caissiersData, isLoading: isCaissierLoading } =
    useGetCaissierByPMAndBookmakerQuery(
      {
        bookmaker_id: bookmaker as number,
        payment_method_id: payment as string,
      },
      {
        skip: !payment || !bookmaker, // Skip the query if payment or bookmaker is not selected
        refetchOnMountOrArgChange: true,
      },
    );
  const [caissier, setCaissier] = useState<number>();

  const caissiers = caissiersData || [];
  const isCaissierDisabled = !payment || !bookmaker;
  const [isCaissierSelectOpen, setIsCaissierSelectOpen] = useState(false);

  const inputClasses =
    'bg-neutral rounded pl-6 py-2 focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary';
  const iconClasses = 'w-12 h-12 text-neutral p-1';

  return (
    <form>
      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <GlobeEuropeAfrica className="w-12 h-12 text-neutral p-1" />
        <MyCountrySelector />
      </div>

      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <Wallet className="w-12 h-12 text-neutral p-1" />
        <PaymentSelector
          id="payment"
          open={isPaymentSelectOpen}
          onToggle={() => setIsPaymentSelectOpen(!isPaymentSelectOpen)}
          onChange={(val?: string) => setPayment(val)}
          selectedValue={
            PAYMENTS?.find(
              (option) => option.nom_moyen === payment,
            ) as PaymentMethod
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
          onChange={(val?: number) => setBookmaker(val)}
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
          onChange={(val?: number) => setCaissier(val)}
          selectedValue={
            caissiers?.find((option) => option.id === caissier) as Employee
          }
          dataArray={caissiers}
          isLoading={isCaissierLoading}
          disabled={isCaissierDisabled}
        />
      </div>

      <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
        <KeyFill className={iconClasses} />
        <input
          type="text"
          id="transactionId"
          className={inputClasses}
          placeholder="Transaction Id"
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="btn-wide btn font-bold mb-6 rounded-btn">Soumettre</div>
      </div>
    </form>
  );
};

export default Form;
