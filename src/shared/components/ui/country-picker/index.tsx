import React, { useState } from 'react';
import { COUNTRIES } from './lib/countries';
import CountrySelector from './lib/selector';
import { SelectMenuOption } from './lib/types';

const MyCountrySelector = () => {
  const myRef = React.createRef<HTMLDivElement>();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState('AF');

  return (
    <CountrySelector
      id={'countries'}
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onChange={(val: string) => setCountry(val)}
      // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
      selectedValue={
        COUNTRIES.find((option) => option.value === country) as SelectMenuOption
      }
    />
  );
};

export default MyCountrySelector;
