
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class EventFilters {
    fromDate?: string;
    toDate?: string;
    tags?: string[];
}

export class EventInput {
    id?: number;
    name?: string;
    description?: string;
    type?: string;
    date?: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class RegistrationInput {
    email?: string;
    password?: string;
    passwordConfirm?: string;
}

export class Event {
    id: number;
    type: string;
    name: string;
    description?: string;
    date: string;
}

export abstract class IMutation {
    abstract registration(registrationInput?: RegistrationInput): SessionData | Promise<SessionData>;

    abstract login(loginInput?: LoginInput): SessionData | Promise<SessionData>;

    abstract logout(): boolean | Promise<boolean>;

    abstract createEvent(event?: EventInput): Event | Promise<Event>;
}

export abstract class IQuery {
    abstract whoAmI(): SessionData | Promise<SessionData>;

    abstract getEvents(eventFilters?: EventFilters): Event[] | Promise<Event[]>;
}

export class SessionData {
    id?: number;
    user_id?: number;
    email?: string;
    role?: string;
    status?: string;
}
