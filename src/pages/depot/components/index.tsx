import React from 'react';
import {
  GlobeEuropeAfrica,
  Journals,
  KeyFill,
  PersonBadge,
  Wallet,
} from 'react-bootstrap-icons';

import MyCountrySelector from '@/shared/components/ui/country-picker';
import MyPaymentSelector from '@/shared/components/ui/payment-method-picker';
import MyBookmakerSelector from '@/shared/components/ui/bookmaker-picker';

const options = [
  { value: '11', label: '1111' },
  { value: '10215', label: '10215' },
  { value: '102', label: '102' },
];

const Form: React.FC = () => {
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
          <MyPaymentSelector />
        </div>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <Wallet className="w-12 h-12 text-neutral p-1" />
          <MyBookmakerSelector />
        </div>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <PersonBadge className="w-12 h-12 text-neutral p-1" />
          <select name="caissier" id="caissier" className={inputClasses}>
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
