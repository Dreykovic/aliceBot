interface TelegramWebApp {
  initData: string;
  on(event: string, callback: (data: any) => void): void;
}

interface Window {
  TelegramWebApp?: TelegramWebApp;
}
