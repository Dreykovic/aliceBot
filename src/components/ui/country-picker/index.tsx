import { useState } from 'react';

import { COUNTRIES } from '../../../utils/countries';

import CountrySelector from './lib/selector';
import { SelectMenuOption } from './lib/types';

const MyCountrySelector = () => {
  //   const myRef = React.createRef<HTMLDivElement>();

  const [isCountrySelectorOpen, setIsCountrySelectorOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState('TG');

  return (
    <CountrySelector
      id={'countries'}
      open={isCountrySelectorOpen}
      onToggle={() => setIsCountrySelectorOpen(!isCountrySelectorOpen)}
      onChange={(val: string) => setCountry(val)}
      // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
      selectedValue={
        COUNTRIES.find((option) => option.value === country) as SelectMenuOption
      }
    />
  );
};

export default MyCountrySelector;
