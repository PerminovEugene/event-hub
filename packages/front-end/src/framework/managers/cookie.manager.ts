import { SessionData } from '@calendar/shared';
// import { getEnvManager } from '../configuration/environment-manger-keeper';

// export const setUserCookie = (user: SessionData) => {
//   const amanger = getEnvManager();
//   if (amanger.isServerSide()) {
//     return;
//   }
//   (document.cookie as any) = `user=${JSON.stringify(user)}`;
// };

// export const getUserCookie = (): SessionData => {
//   if (getEnvManager().isServerSide()) {
//     return;
//   }
//   var result = document.cookie.match(new RegExp('user' + '=([^;]+)'));
//   result && (result = JSON.parse(result[1]));
//   return result as SessionData;
// };
