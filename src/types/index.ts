export {};

declare global {
  interface Window {
    Telegram: {
      WebApp: { initDataUnsafe: { user: number } };
    };
  }
}
