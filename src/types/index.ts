export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        openTelegramLink(url: string): unknown;
        openLink(url: string): unknown;
        expand(): unknown;
        ready(): unknown;
        initDataUnsafe: { user: { id: number } };
      };
    };
  }
}
