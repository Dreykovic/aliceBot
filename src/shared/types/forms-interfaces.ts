export interface Order {
  employee_payment_method: number;
  order_type: 'DEPOT' | 'RETRAIT';
  bookmaker_identifiant: number;
  reference_id: string;
  montant: number;
  code_parainage?: string;
  state?: 'COMMING' | 'CONFIRMED' | 'CANCELLED';
  client: number;
  contact?: string;
}
