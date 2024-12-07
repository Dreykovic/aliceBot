import { useEffect, useState } from 'react';

import env from '@/config/env';

import { TelegramUser } from '../types/api';

const useTelegramUser = (): TelegramUser | null => {
  const [user, setUser] = useState<TelegramUser | null>(null);

  const loadTelegram = async (): Promise<TelegramUser | null> => {
    const _telegram = (window as any).Telegram;

    if (!_telegram || !_telegram.WebApp || !_telegram.WebApp.initData) {
      // console.log("En attente de l'initialisation de Telegram...");
      return null;
    }

    const initData = _telegram.WebApp.initData;
    return parseInitData(initData);
  };

  useEffect(() => {
    const tryLoadTelegram = async () => {
      try {
        const response = await loadTelegram();
        if (response) {
          //alert('Telegram Web App API disponible');
          setUser(response);
        } else {
          setTimeout(tryLoadTelegram, 100); // Réessaye après 100ms
        }
      } catch (error) {
        // console.error('Erreur lors du chargement de Telegram', error);
      }
    };

    tryLoadTelegram();
  }, []); // Dépendance vide pour ne s'exécuter qu'une fois au montage

  const parseInitData = (initData: string): TelegramUser | null => {
    try {
      const params = new URLSearchParams(initData);
      const userEncoded = params.get('user') || '';
      const userDecoded = JSON.parse(userEncoded);
      // alert(userEncoded);
      // alert(userDecoded);
      return {
        id: userDecoded?.id,
        firstName: userDecoded?.first_name,
        lastName: userDecoded?.last_name,
        username: userDecoded?.username,
        photoUrl: userDecoded?.photo_url,
        languageCode: userDecoded?.language_code,
      };
    } catch (error) {
      // console.error('Erreur lors du parsing des données initData', error);
      return null;
    }
  };

  return env.appState === 'dev'
    ? {
        // id: '7332983362',
        id: '122214562',
        firstName: 'Tester',
        lastName: 'Local',
        username: 'CodeurPassionnes',
        photoUrl: 'https://t.me/CodeurPassionnes',
        languageCode: 'string',
      }
    : user;
};

export default useTelegramUser;
