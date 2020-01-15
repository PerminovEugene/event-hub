import { getEnvManager } from '../configuration/environment-manger-keeper';

export const setCookie = (name: string, value: any, options: any = {}) => {
  const manger = getEnvManager();
  if (manger.isServerSide()) {
    return;
  }
  options = {
    path: '/',
    ...options,
  };

  if (options.expires?.toUTCString) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += '; ' + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += '=' + optionValue;
    }
  }
  document.cookie = updatedCookie;
};

export const deleteCookie = (name: string) => {
  setCookie(name, '', {
    'max-age': -1,
  });
};
