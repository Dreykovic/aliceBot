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
  username: string;
  code_parainage_depot: string;
  montant_parainage_depot: string;
  country: string;
}

export interface PaymentMethod {
  id: undefined | number;
  nom_moyen: string;
  code_operation: string;
  contact: string;
  mot_recharge: string;
  mot_retrait: string;
}

export interface Bookmaker {
  id: undefined | number;
  nom_bookmaker: string;
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
export interface Order {
  id: undefined | number;
  client: string;
  employee_payment: number;
  is_depot: string;
  bookmaker_identifiant: number;
  transaction_id: string;
  montant: number;
  code_parainage: string;
  contact: string;
  state: 'INCOMPLET' | 'COMMING' | 'CONFIRMED' | 'CANCELLED';
}
