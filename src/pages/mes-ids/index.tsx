import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  setPageTitle,
  setPageType,
} from '@/shared/components/layouts/partials/header/header-slice';
import Subtitle from '@/shared/components/ui/Typography/subtitle';
import useWindowDimensions from '@/shared/hooks/use-window-dimensions';
import { AppDispatch } from '@/stores';


interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}



const MesIds: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  useEffect(() => {
    // if (width >= 1024) {
    //   navigate('/');
    // }

    dispatch(setPageTitle({ title: 'Mes Ids' }));
    dispatch(setPageType({ type: 'main' }));
  }, [dispatch, navigate, width]);

  return (
    <>
      <div className="p-4 overflow-hidden h-full">
        <div className="my-2 text-base-300 shadow-md flex justify-between">
          <Subtitle className="">{'Mes Ids'}</Subtitle>
        </div>
      </div>
    </>
  );
};


const TelegramUserInfo: React.FC = () => {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    if (window.Telegram?.WebApp?.initDataUnsafe?.user) {
      const userInfo = window.Telegram.WebApp.initDataUnsafe.user;
      setUser(userInfo);
    }
  }, []);

  if (!user) {
    return <div>Aucun utilisateur connecté.</div>;
  }

  return (
    <div>
      <h2>Bienvenue {user.first_name} {user.last_name || ""}</h2>
      {user.photo_url && <img src={user.photo_url} alt="User Avatar" />}
      <p>Username: @{user.username}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
};



export default {MesIds, TelegramUserInfo};
