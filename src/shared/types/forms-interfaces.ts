export interface Order {
  country: string;
  employee_payment: number;
  is_depot: string;
  bookmaker_identifiant: number;
  transaction_id: string;
  montant: number;
  code_parainage?: string;
  state?: 'INCOMPLET' | 'COMMING' | 'CONFIRMED' | 'CANCELLED';
  client: number;
}
