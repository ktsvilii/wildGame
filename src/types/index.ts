export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: {
        expand(): unknown;
        ready(): unknown;
        initDataUnsafe: { user: { id: number } };
      };
    };
  }
}
