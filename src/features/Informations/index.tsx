import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Logo from '@/assets/images/logo/logo-bg.png';
import { setPageTitle, setPageType } from '@/components/header/header-slice';
import useWindowDimensions from '@/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';

import socials from './socials';

const Informations: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    // if (width >= 1024) {
    //   navigate('/');
    // }

    dispatch(setPageTitle({ title: 'Informations' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  return (
    <div className="h-full overflow-auto">
      <div className=" h-full my-2 py-4 text-base-300 shadow-md flex flex-col  items-center justify-around">
        <div className="flex flex-col items-center justify-end gap-5">
          <div className="avatar ">
            <div className="w-32 rounded-full bg-secondary">
              <img src={Logo} alt="" className="" />
            </div>
          </div>
          <div className="flex  items-center justify-around gap-5 flex-wrap">
            {socials.map((social) => {
              return (
                <a
                  href={social.link}
                  target="_blank"
                  className="flex flex-col items-center"
                  key={social.label}
                  rel="noreferrer"
                >
                  <div className="avatar placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                      <span className="text-xs">{social.icon}</span>
                    </div>
                  </div>
                  <span className="text-[8px] text-base-content">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
        <span className="text-base-100">Powered by Emile Business</span>
        <a
          className="text-primary underline mb-5"
          href="https://alicebot.me/terms-of-use.html"
          target="_blank"
        >
          COnditions D'utilisation
        </a>
      </div>
    </div>
  );
};

export default Informations;
