
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class AppUserInput {
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

export class CatInput {
    name?: string;
    age?: number;
}

export class AppUser {
    id?: number;
    email?: string;
    role?: string;
    status?: string;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}

export abstract class IMutation {
    abstract registration(user?: AppUserInput): AppUser | Promise<AppUser>;

    abstract createCat(cat?: CatInput): string | Promise<string>;
}

export abstract class IQuery {
    abstract login(email: string, password: string): AppUser | Promise<AppUser>;

    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;
}
