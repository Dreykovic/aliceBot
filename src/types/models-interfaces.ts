export interface Employee {
  id: undefined | number;
  nom: string;
  prenom: string;
  contact: string;
  create_at: string;
  username: string;
}

export interface Client {
  id: undefined | number;
  nom: string;
  prenom: string;
  contact: string;
  create_at: string;
  id_chat: string;
  username: string;
  code_parainage_depot: number;
  montant_parainage_depot: string;
  codeparainageclient: string | null;
  country: string;
}
export interface ClientBookmaker {
  identifiant: string;
  client: number;
  bookmaker: number;
  id: number;
}

export interface PaymentMethod {
  id: undefined | number;
  nom_moyen: string;
  code_operation: string;
  contact: string;
  mot_recharge: string;
  mot_retrait: string;
  payement_method_img: string;
}

export interface Bookmaker {
  id: undefined | number;
  nom_bookmaker: string;
  bookmaker_img: string;
}

export interface EmployeePaymentMethod {
  id: undefined | number;
  code_agent: number;
  frais_depot: number;
  frais_retrait: number;
  etablissement: string;
  rue: string;
  ville: string;
  employee: number;
  payement_methode: number;
  bookmaker: number;
  syntaxe: string;
}
export interface OrderCreate {
  employee_payment_method: number;
  order_type: 'DEPOT' | 'RETRAIT';
  bookmaker_identifiant: number;
  reference_id: number | string;
  montant: number;
  code_parainage?: string;
  state?: 'COMMING' | 'CONFIRMED' | 'CANCELLED';
  client: number;
  contact?: string;
}

export interface Order {
  employee_payment_method: number;
  type_transaction: 'DEPOT' | 'RETRAIT';
  bookmaker_identifiant: number;
  reference_id: number;
  montant: number;
  code_parainage?: string;
  state?: 'COMMING' | 'CONFIRMED' | 'CANCELLED';
  client: number;
  contact?: string;
}
export interface CodeParrainage {
  id: number;
  code: string;
  plafond_retrait: number;
  pourcentage_benefice: number;
  state: boolean;
}
