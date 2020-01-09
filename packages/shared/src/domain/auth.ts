export enum Role {
  admin = "admin",
  superAdmin = "superAdmin",
  manager = "manager",
  guest = "guest",
  client = "client"
}

export enum GroupName {
  "all" = "all",
  "authorised" = "authorised",
  "staff" = "staff",
  "admins" = "admins",
  "unauthorised" = "unauthorised"
}

type Group = {
  [key in keyof GroupName]?: Array<Role>;
};

// TS doesn't support spread for Set :(
const setToArray = (set: Set<any>) => Array.from(set.values());

export const groups: Group = {};
groups[GroupName.admins] = new Set([Role.admin, Role.superAdmin]);
groups[GroupName.staff] = new Set([
  ...setToArray(groups[GroupName.admins]),
  Role.manager
]);
groups[GroupName.authorised] = new Set([
  ...setToArray(groups[GroupName.staff]),
  Role.client
]);
groups[GroupName.all] = new Set([
  ...setToArray(groups[GroupName.authorised]),
  Role.guest
]);
groups[GroupName.unauthorised] = new Set([Role.guest]);

export enum Resource {
  event = "event",
  auth = "auth"
}

export enum Action {
  read = "read",
  create = "create",
  update = "update",
  delete = "delete",

  login = "login",
  registration = "registration"
}

export const permissions = {
  [Resource.event]: {
    [Action.read]: groups[GroupName.all],
    [Action.create]: groups[GroupName.authorised],
    [Action.update]: groups[GroupName.authorised],
    [Action.delete]: groups[GroupName.authorised]
  },
  [Resource.auth]: {
    [Action.registration]: groups[GroupName.unauthorised],
    [Action.login]: groups[GroupName.unauthorised]
  }
};

export type CheckRightsParams = {
  role: Role;
  resource: Resource;
  action: Action;
};

export const isUserHasRights = ({
  role,
  resource,
  action
}: CheckRightsParams): boolean => {
  return permissions[resource][action].has(role);
};
