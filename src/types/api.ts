export interface TelegramUser {
  id: string;
  firstName: string;
  lastName: string;
  username: string | null;
  photoUrl: string | null;
  languageCode: string;
}
