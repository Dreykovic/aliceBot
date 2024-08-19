import './bg-particles.css';

import {
  BanknotesIcon,
  CurrencyDollarIcon,
  CurrencyEuroIcon,
  CurrencyYenIcon,
} from '@heroicons/react/24/outline';
const BgParticles = () => {
  return (
    <div className="area">
      <ul className="circles text-primary">
        <li>
          <BanknotesIcon />
        </li>
        <li>
          <CurrencyDollarIcon />
        </li>
        <li>
          <BanknotesIcon />
        </li>
        <li>
          <CurrencyDollarIcon />
        </li>
        <li>
          <BanknotesIcon />
        </li>
        <li>
          <CurrencyEuroIcon />
        </li>
        <li>
          <BanknotesIcon />
        </li>
        <li>
          <CurrencyEuroIcon />
        </li>
        <li>
          <BanknotesIcon />
        </li>
        <li>
          <CurrencyYenIcon />
        </li>
      </ul>
    </div>
  );
};
export default BgParticles;
