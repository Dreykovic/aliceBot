import MyCountrySelector from '@/shared/components/ui/country-picker';
import React from 'react';
import { GlobeEuropeAfrica, Journals, KeyFill } from 'react-bootstrap-icons';

const options = [
  { value: '1xbet', label: '1xbet' },
  { value: 'betWinner', label: 'betWinner' },
  { value: '1xWin', label: '1xWin' },
];

const Form: React.FC = () => {
  const inputClasses =
    'bg-neutral rounded pl-6 py-2  focus:outline-none w-full text-neutral-content focus:bg-base-100 m-1 focus:text-neutral';
  const iconClasses = 'w-12 h-12 text-neutral p-1';
  return (
    <>
      <form>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <KeyFill className={iconClasses} />

          <input
            type="text"
            id="transactionId"
            className={inputClasses}
            placeholder="Transaction Id"
          />
        </div>
        <div className="flex items-center text-lg mb-6 bg-base-300 rounded-lg">
          <Journals className="w-12 h-12 text-neutral p-1" />
          <select name="bookmaker" id="bookmaker" className={inputClasses}>
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
          <GlobeEuropeAfrica className="w-12 h-12 text-neutral p-1" />
          <MyCountrySelector />
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
