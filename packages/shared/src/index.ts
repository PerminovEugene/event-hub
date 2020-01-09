export * from "./transport/graphql.definitions";

export * from "./domain/auth";
// export class CatInput {
//     name?: string;
//     age?: number;
// }

// export class EventInput {
//     id?: number;
//     name?: string;
//     description?: string;
//     type?: string;
//     date?: string;
// }

// export class LoginInput {
//     email: string;
//     password: string;
// }

// export class RegistrationInput {
//     email?: string;
//     password?: string;
//     passwordConfirm?: string;
// }

// export class Cat {
//     id?: number;
//     name?: string;
//     age?: number;
// }

// export class Event {
//     id: number;
//     type: string;
//     name: string;
//     description?: string;
//     date: string;
// }

// export abstract class IMutation {
//     abstract createCat(cat?: CatInput): string | Promise<string>;

//     abstract registration(user?: RegistrationInput): SessionData | Promise<SessionData>;

//     abstract login(email: string, password: string): SessionData | Promise<SessionData>;

//     abstract createEvent(event?: EventInput): Event | Promise<Event>;
// }

// export abstract class IQuery {
//     abstract getCats(): Cat[] | Promise<Cat[]>;

//     abstract cat(id: string): Cat | Promise<Cat>;

//     abstract whoAmI(): SessionData | Promise<SessionData>;

//     abstract getEvents(month?: string): Event[] | Promise<Event[]>;
// }

// export class SessionData {
//     id?: number;
//     email?: string;
//     role?: string;
//     status?: string;
// }
