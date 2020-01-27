
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export class EventInput {
    name?: string;
    description?: string;
    type?: string;
    date?: string;
}

export class EventsFiltersInput {
    fromDate?: string;
    toDate?: string;
    tags?: string[];
}

export class EventUpdateInput {
    id: number;
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

export class TagInput {
    name: string;
}

export class TagsFiltersInput {
    theme?: string;
}

export class TagUpdateInput {
    id?: number;
    name?: string;
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

    abstract createEvent(eventInput?: EventInput): Event | Promise<Event>;

    abstract updateEvent(eventUpdateInput?: EventUpdateInput): Event | Promise<Event>;

    abstract createTag(tagInput?: TagInput): Tag | Promise<Tag>;
}

export abstract class IQuery {
    abstract whoAmI(): SessionData | Promise<SessionData>;

    abstract events(eventFiltersInput?: EventsFiltersInput): Event[] | Promise<Event[]>;

    abstract event(id: string): Event | Promise<Event>;

    abstract tags(tagFiltersInput?: TagsFiltersInput): Tag[] | Promise<Tag[]>;

    abstract tag(id?: string): Tag | Promise<Tag>;
}

export class SessionData {
    id?: number;
    user_id?: number;
    email?: string;
    role?: string;
    status?: string;
}

export class Tag {
    id?: string;
    name?: string;
}
