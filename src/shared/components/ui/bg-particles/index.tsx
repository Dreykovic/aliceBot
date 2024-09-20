import {
  Cash,
  CashCoin,
  CashStack,
  Coin,
  CurrencyDollar,
  CurrencyEuro,
  CurrencyExchange,
  CurrencyPound,
  CurrencyRupee,
  CurrencyYen,
} from 'react-bootstrap-icons';
import './bg-particles.css';
const classes = 'w-full h-full';
const BgParticles = () => {
  return (
    <div className="area bg-neutral">
      <ul className="circles text-base-content">
        <li>
          <CashCoin className={classes} />
        </li>
        <li>
          <Coin className={classes} />
        </li>
        <li>
          <CurrencyDollar className={classes} />
        </li>
        <li>
          <Cash className={classes} />
        </li>
        <li>
          <CurrencyEuro className={classes} />
        </li>
        <li>
          <CurrencyPound className={classes} />
        </li>
        <li>
          <CurrencyYen className={classes} />
        </li>
        <li>
          <CurrencyRupee className={classes} />
        </li>
        <li>
          <CashStack className={classes} />
        </li>
        <li>
          <CurrencyExchange className={classes} />
        </li>
      </ul>
    </div>
  );
};
export default BgParticles;
