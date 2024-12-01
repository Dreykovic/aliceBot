import { ClientBookmaker } from '@/types/models-interfaces';
import { useState } from 'react';

import * as Icon from 'react-bootstrap-icons';
import CopyToClipboard from 'react-copy-to-clipboard';

type Props = { IdsItem: ClientBookmaker };

const CLientBookmakerItem = ({ IdsItem }: Props) => {
  const actionBtnClasses = 'btn btn-ghost p-2 ';
  const [copied, setCopied] = useState<Boolean>(false);
  return (
    <div className={`p-3 rounded-box  mb-3  relative bg-ternary  `}>
      <div className={`flex items-center   justify-between`}>
        <div className="flex items-center mb-1 gap-2">
          <div className="avatar placeholder">
            <div className={` w-12 rounded bg-secondary`}>
              <Icon.Box2Fill className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="text-[12px]">{IdsItem.bookmaker}</div>
          </div>
        </div>
        <div>
          <CopyToClipboard
            text={IdsItem.identifiant}
            onCopy={() => {
              console.log('copied');
              setCopied(true);

              setTimeout(() => {
                setCopied(false);
              }, 3000);
            }}
          >
            <div className={`${actionBtnClasses}`} role="button">
              {copied ? (
                <Icon.Clipboard2CheckFill className="w-5 h-5" />
              ) : (
                <Icon.Clipboard2 className="w-5 h-5" />
              )}
            </div>
          </CopyToClipboard>

          <div tabIndex={0} role="button" className={`${actionBtnClasses}`}>
            <Icon.ThreeDotsVertical />
          </div>
        </div>
      </div>
      <hr />
      <div
        tabIndex={0}
        className={`flex items-center z-[1] justify-between dropdown-content shadow`}
      >
        <div className="flex items-center gap-5">
          <div className="">Id: {IdsItem.identifiant}</div>
        </div>
        <div className="flex gap-1 ">
          <div role="button" className={`${actionBtnClasses}`}>
            <Icon.Pencil />
          </div>
          <div role="button" className={`${actionBtnClasses}`}>
            <Icon.Trash2 />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CLientBookmakerItem;
