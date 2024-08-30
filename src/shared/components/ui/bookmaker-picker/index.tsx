import { useState } from 'react';

import { BOOKMAKERS } from './lib/bookmakers';
import BookmakerSelector from './lib/selector';
import { SelectMenuOption } from './lib/types';

const MyBookmakerSelector = () => {
  //   const myRef = React.createRef<HTMLDivElement>();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [bookmaker, setBookmaker] = useState('');

  return (
    <BookmakerSelector
      id={'countries'}
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onChange={(val: string) => setBookmaker(val)}
      // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
      selectedValue={
        BOOKMAKERS.find(
          (option) => option.value === bookmaker,
        ) as SelectMenuOption
      }
    />
  );
};

export default MyBookmakerSelector;
