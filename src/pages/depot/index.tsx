import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Bookmaker, Employee, Order, PaymentMethode } from '@/api/models-interfaces';
import { get_bookmakers } from '@/api/services/bookmaker';
import { get_payements_methode } from '@/api/services/payementmethode';
import {
  setPageTitle,
  setPageType,
} from '@/shared/components/layouts/partials/header/header-slice';
import Subtitle from '@/shared/components/ui/Typography/subtitle';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';
import { get_employees } from '@/api/services/employee';

const Depot: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Order>();
  const onSubmit: SubmitHandler<Order> = (data) => console.log(data);
  const [payementsMethode, setPayementsMethode] = useState<PaymentMethode[]>(
    [],
  );
  const [bookmakers, setBookmakers] = useState<Bookmaker[]>([]);

  const [employees, setEmployees] = useState<Employee[]>([]);

  /**
   *  {
   *    "client":22,
   *    "employee_payment":10,
   *    "is_depot":true,
   *    "transaction_id":"338258",
   *    "montant":200,
   *    "code_parainage":null,
   *    "bookmaker_identifiant":null
   * }
   */

  useEffect(() => {
    if (width >= 1024) {
      navigate('/');
    }

    dispatch(setPageTitle({ title: 'Depot' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  useEffect(() => {
    get_payements_methode()
      .then((data) => {
        console.log('Hello1');
        setPayementsMethode(data);
      })
      .catch((e) => {
        console.log(e);
      });
    get_bookmakers()
      .then((data) => {
        console.log('Hello2');
        setBookmakers(data);
      })
      .catch((e) => {
        console.log(e);
      });
    get_employees()
      .then((data) => {
        console.log('Hello3');
        setEmployees(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <div className="p-4 overflow-hidden h-full">
        <div className="my-4 text-base-300 flex flex-col space-y-4">
          <Subtitle className="text-lg font-semibold">{'Dépôt'}</Subtitle>
        </div>
        <div className="hidden bg-green-500 text-white py-2 rounded-md px-3 text-sm">Syntaxe</div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-white"
              >
                Sélectionnez votre pays
              </label>
              <select
                id="country-select"
                className="bg-white text-black w-full py-3 px-4 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                >
                <option value="" disabled selected>
                  Pays
                </option>
                <option value="togo">🇹🇬 Togo</option>
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-white">
                Sélectionnez votre pays
              </label>
              <select
                id="payment-method-select"
                className="bg-white text-black w-full py-3 px-4 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="" disabled selected>
                  Selectionner méthode de paiement
                </option>
                {payementsMethode.map((payementmethode, index) => (
                  <option key={index} value={payementmethode.id}>
                    {payementmethode.nom_moyen}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-white"
              >
                Sélectionnez votre bookmaker
              </label>
              <select
                id="bookmaker-select"
                className="bg-white text-black w-full py-3 px-4 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              >
                <option value="" disabled selected>
                  Selectionner
                </option>
                {bookmakers.map((bookmaker, index) => (
                  <option key={index} value={bookmaker.id}>
                    {bookmaker.nom_bookmaker}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-white"
              >
                Sélectionnez votre caissier
              </label>
              <select
                id="bookmaker-select"
                className="bg-white text-black w-full py-3 px-4 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                defaultValue="test"
                {...register('employee_payment')}
                >
                <option value="" disabled selected>
                  Selectionner
                </option>
                {employees.map((employee, index) => (
                  <option key={index} value={employee.id}>
                    {employee.username}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-white"
              >
                Saisir le montant
              </label>
              <input
                id="bookmaker-select"
                type="number"
                className="bg-white text-black w-full py-3 px-4 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                defaultValue="1000"
                {...register('montant')}
              />
            </div>

            <div className="space-y-2" hidden>
              <label
                htmlFor="country-select"
                className="block text-sm font-medium text-white"
              >
                Saisir l&apos;idendifiant de la transaction
              </label>
              <input
                id="bookmaker-select"
                type="text"
                className="bg-white text-black w-full py-3 px-4 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
                defaultValue=""
                {...register('transaction_id')}
              />
            </div>

            <div className="">
              <button
                type="submit"
                className="w-full bg-base-300 text-gray-700 py-2 px-3 rounded-lg shadow-md hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-base-300 focus:ring-opacity-50"
              >
                Soumettre
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Depot;
