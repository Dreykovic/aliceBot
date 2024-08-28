import axios from 'axios';

import { PAYMENTS_METHODE_ENDPOINT } from '../constantes/endpoints';
import { PaymentMethode } from '../models-interfaces';

export const get_payements_methode = async (): Promise<PaymentMethode[]> => {
  try {
    const res = await axios.get(`${PAYMENTS_METHODE_ENDPOINT}`);
    return res.data;
  } catch (e) {
    console.log('');
    throw e;
  }
};
