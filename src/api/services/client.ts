import axios from 'axios';

import { CLIENTS_ENDPOINT } from '../constantes/endpoints';
import { Client } from '../models-interfaces';

export const get_clients = async (): Promise<Client[]> => {
  try {
    const res = await axios.get(`${CLIENTS_ENDPOINT}`);
    return res.data;
  } catch (e) {
    console.log('');
    throw e;
  }
};

export const get_client = async (chat_id: number): Promise<Client[]> => {
  try {
    const res = await axios.get(`${CLIENTS_ENDPOINT}/${chat_id}`);
    return res.data;
  } catch (e) {
    console.log('');
    throw e;
  }
};

export const create_client = async (chat_id: number): Promise<Client[]> => {
  try {
    const res = await axios.get(`${CLIENTS_ENDPOINT}/${chat_id}`);
    return res.data;
  } catch (e) {
    console.log('');
    throw e;
  }
};
