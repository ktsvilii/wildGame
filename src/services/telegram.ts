export const getTelegram = () => {
  const tg = window.Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;

  return {
    tg,
    user,
  };
};
