import { useState } from 'react';
import * as Icon from 'react-bootstrap-icons';
import CopyToClipboard from 'react-copy-to-clipboard';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import DefaultBookMakerImg from '@/assets/images/bookmakers/download.png';

import env from '@/config/env';
import { ClientBookmaker } from '@/types/models-interfaces';

import { useDeleteClientBookmakerMutation, useGetBookmakerQuery } from '../api';

type Props = { IdsItem: ClientBookmaker };

const CLientBookmakerItem = ({ IdsItem }: Props) => {
  const actionBtnClasses = 'btn btn-ghost p-2 ';
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    data: bookmakerData,
    isLoading: isBookmakerLoading,
    isSuccess: isBookmakerSuccess,
  } = useGetBookmakerQuery(
    {
      bookmaker_id: String(IdsItem.bookmaker),
    },
    {
      skip: !IdsItem,
      refetchOnMountOrArgChange: true,
    },
  );
  const [deleteClientBookmaker] = useDeleteClientBookmakerMutation();
  const handleDelete = async () => {
    const MySwal = withReactContent(Swal);
    const swalForParrainage = MySwal.mixin({
      allowOutsideClick: false,

      allowEscapeKey: false,
      showCancelButton: true,
    });
    try {
      if (IdsItem) {
        setIsLoading(true);
        const result = await swalForParrainage.fire({
          title: 'Supprimer Id',
          icon: 'warning',

          text: `Voulez vous supprimer l'ID ${IdsItem.identifiant} du bookmaker ${bookmakerData?.nom_bookmaker}?`,

          confirmButtonText: 'Oui',
          cancelButtonText: 'Non',
          reverseButtons: true,
        });
        if (result.isConfirmed) {
          await deleteClientBookmaker(String(IdsItem.id)).unwrap();
          await MySwal.fire({
            text: `Id ${IdsItem.identifiant} du bookmaker ${bookmakerData?.nom_bookmaker} a été supprimé`,
            allowOutsideClick: false,
            timer: 10000,
            timerProgressBar: true,
            showCloseButton: true,
            showConfirmButton: false,
            icon: 'success',
          });
        }
      } else {
        throw new Error('No client');
      }
    } catch (error) {
      MySwal.fire({
        title: 'Erreur',
        text: `Une erreur est survenue lors de la suppression. Vérifiez lrs informations entrées`,
        icon: 'error',
        confirmButtonText: 'Réessayer',

        allowOutsideClick: false,
      });
    } finally {
      setIsLoading(false); // Arrête le chargement, quelle que soit l'issue
    }
  };
  return (
    <div className={`p-3 rounded-box  mb-3  relative bg-ternary  `}>
      <div className={`flex items-center   justify-between`}>
        <div className="flex items-center mb-1 gap-2">
          <div className={`rounded w-28 h-7 bg-secondary`}>
            {isBookmakerSuccess ? (
              <img
                alt={`${bookmakerData.nom_bookmaker}`}
                src={
                  bookmakerData.bookmaker_img
                    ? `${env.baseServerUrl}${bookmakerData.bookmaker_img}`
                    : DefaultBookMakerImg
                }
                className={' mr-2 object-cover  w-28 h-7'}
              />
            ) : (
              <Icon.Box2Fill className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-1">
              <Icon.WalletFill />
              {isBookmakerLoading ? (
                <span
                  className={` loading loading-spinner text-neutral-content`}
                  onClick={handleDelete}
                ></span>
              ) : isBookmakerSuccess ? (
                <span>{bookmakerData.nom_bookmaker}</span>
              ) : (
                ''
              )}{' '}
            </div>
            <div className="text-[12px]">Id : {IdsItem.identifiant}</div>
          </div>
        </div>
        <div>
          <CopyToClipboard
            text={IdsItem.identifiant}
            onCopy={() => {
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            <div className={` tooltip`} data-tip="Copier">
              <button className={`${actionBtnClasses}`}>
                {copied ? (
                  <Icon.Clipboard2CheckFill className="w-5 h-5" />
                ) : (
                  <Icon.Clipboard2 className="w-5 h-5" />
                )}
              </button>
            </div>
          </CopyToClipboard>

          <div className="tooltip" data-tip="Supprimer">
            <button
              className={`${actionBtnClasses}  ${isLoading ? 'loading loading-spinner text-warning' : ''}`}
              onClick={handleDelete}
            >
              {isLoading ? '' : <Icon.Trash3 className="w-5 h-5 " />}
            </button>
          </div>
        </div>
      </div>
      <hr />
    </div>
  );
};
export default CLientBookmakerItem;
