import { useEffect, useState } from 'react';
import { TelegramUser } from '../types/api';

const useTelegramUser = (): TelegramUser | null => {
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    // Vérifier si Telegram Web App est disponible
    if (window.TelegramWebApp) {
      const telegramWebApp = window.TelegramWebApp;

      // Vérifier si les données utilisateur sont disponibles
      if (telegramWebApp.initData) {
        const initData = telegramWebApp.initData;
        const userData = parseInitData(initData);

        // Mettre à jour l'état avec les données utilisateur
        setUser(userData);
      } else {
        // Si les données ne sont pas disponibles, écouter les changements
        telegramWebApp.on('user', (data: TelegramUser) => {
          setUser(data);
        });
      }
    } else {
      console.error('Telegram Web App API non disponible');
    }
  }, []);

  const parseInitData = (initData: string): TelegramUser | null => {
    // Implémentez une logique pour parser les données d'initData si nécessaire
    // Exemple de parsing simplifié
    try {
      const params = new URLSearchParams(initData);
      return {
        id: params.get('user_id') || '',
        firstName: params.get('first_name') || '',
        lastName: params.get('last_name') || '',
        username: params.get('username'),
        photoUrl: params.get('photo_url'),
        languageCode: params.get('language_code') || '',
      };
    } catch (error) {
      console.error('Erreur lors du parsing des données initData', error);
      return null;
    }
  };

  return user;
};

export default useTelegramUser;
