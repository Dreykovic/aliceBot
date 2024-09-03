import React, { useState } from 'react';
import {
  GlobeEuropeAfrica,
  Journals,
  KeyFill,
  PersonBadge,
  Wallet,
} from 'react-bootstrap-icons';

import MyCountrySelector from '@/shared/components/ui/country-picker';

import PaymentSelector from '@/shared/components/common/payment-method-picker/lib/selector';
import { PAYMENTS } from '@/shared/components/common/payment-method-picker/lib/payments';
import { PaymentSelectMenuOption } from '@/shared/components/common/payment-method-picker/lib/types';
import { BOOKMAKERS } from '@/shared/components/common/bookmaker-picker/lib/bookmakers';
import BookmakerSelector from '@/shared/components/common/bookmaker-picker/lib/selector';
import { BookmakerSelectMenuOption } from '@/shared/components/common/bookmaker-picker/lib/types';

const options = [
  { value: '11', label: '1111' },
  { value: '10215', label: '10215' },
  { value: '102', label: '102' },
];

const Form: React.FC = () => {
  const [isPaymentSelectOpen, setIsPaymentSelectOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [payment, setPayment] = useState('');
  //   const myRef = React.createRef<HTMLDivElement>();

  const [isBookmakerSelectOpen, setIsBookmakerSelectOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [bookmaker, setBookmaker] = useState('');

  const inputClasses =
    'bg-neutral rounded pl-6 py-2  focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral focus:ring-1 focus:ring-primary ';
  const iconClasses = 'w-12 h-12 text-neutral p-1';
  return (
    <>
      <form>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <GlobeEuropeAfrica className="w-12 h-12 text-neutral p-1" />
          <MyCountrySelector />
        </div>

        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <Wallet className="w-12 h-12 text-neutral p-1" />
          <PaymentSelector
            id={'payment'}
            open={isPaymentSelectOpen}
            onToggle={() => setIsPaymentSelectOpen(!isPaymentSelectOpen)}
            onChange={(val: string) => setPayment(val)}
            // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
            selectedValue={
              PAYMENTS.find(
                (option) => option.value === payment,
              ) as PaymentSelectMenuOption
            }
          />{' '}
        </div>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <Journals className="w-12 h-12 text-neutral p-1" />
          <BookmakerSelector
            id={'countries'}
            open={isBookmakerSelectOpen}
            onToggle={() => setIsBookmakerSelectOpen(!isBookmakerSelectOpen)}
            onChange={(val: string) => setBookmaker(val)}
            // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
            selectedValue={
              BOOKMAKERS.find(
                (option) => option.value === bookmaker,
              ) as BookmakerSelectMenuOption
            }
          />{' '}
        </div>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <PersonBadge className="w-12 h-12 text-neutral p-1" />
          <select name="caissier" id="caissier" className={inputClasses}>
            <option selected disabled>
              Choisir Un Caissier
            </option>
            {options.map((option) => {
              return (
                <option key={option.label} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </select>
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
          <div className=" btn-wide btn font-bold  mb-6 rounded-btn">
            Soumettre
          </div>
        </div>
      </form>
    </>
  );
};

export default Form;
