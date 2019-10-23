
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class CatInput {
    name?: string;
    age?: number;
}

export class UserInput {
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

export class Cat {
    id?: number;
    name?: string;
    age?: number;
}

export abstract class IMutation {
    abstract createCat(cat?: CatInput): string | Promise<string>;

    abstract registration(user?: UserInput): User | Promise<User>;
}

export abstract class IQuery {
    abstract getCats(): Cat[] | Promise<Cat[]>;

    abstract cat(id: string): Cat | Promise<Cat>;

    abstract login(email: string, password: string): User | Promise<User>;
}

export class User {
    id?: number;
    email?: string;
    role?: string;
}
