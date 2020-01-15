export enum PagePath {
  login = '/login',
  registration = '/registration',
  restorePassword = '/restore-password',

  createEvent = '/event/create',
  editEvent = '/event/:id/edit',
  event = '/event/:id',
  root = '/',
}

export const buildEventPath = (path: PagePath.editEvent | PagePath.event, id: number) => {
  return path.replace(/:id/, `${id}`);
};
