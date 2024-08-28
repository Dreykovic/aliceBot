import axios from 'axios';

import { EMPLOYEES_ENDPOINT } from '../constantes/endpoints';
import { Employee } from '../models-interfaces';

export const get_employees = async (): Promise<Employee[]> => {
  try {
    const res = await axios.get(`${EMPLOYEES_ENDPOINT}`);
    return res.data;
  } catch (e) {
    console.log('');
    throw e;
  }
};
