import axios from 'axios';

import { BOOKMAKER_ENDPOINT } from '../constantes/endpoints';
import { Bookmaker } from '../models-interfaces';

export const get_bookmakers = async (): Promise<Bookmaker[]> => {
  try {
    const res = await axios.get(`${BOOKMAKER_ENDPOINT}`);
    return res.data;
  } catch (e) {
    console.log('');
    throw e;
  }
};
