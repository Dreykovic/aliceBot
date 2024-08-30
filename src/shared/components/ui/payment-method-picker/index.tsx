import { useState } from 'react';

import { PAYMENTS } from './lib/payments';
import PaymentSelector from './lib/selector';
import { SelectMenuOption } from './lib/types';

const MyPaymentSelector = () => {
  //   const myRef = React.createRef<HTMLDivElement>();

  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [payment, setPayment] = useState('TM');

  return (
    <PaymentSelector
      id={'countries'}
      open={isOpen}
      onToggle={() => setIsOpen(!isOpen)}
      onChange={(val: string) => setPayment(val)}
      // We use this type assertion because we are always sure this find will return a value but need to let TS know since it could technically return null
      selectedValue={
        PAYMENTS.find((option) => option.value === payment) as SelectMenuOption
      }
    />
  );
};

export default MyPaymentSelector;
