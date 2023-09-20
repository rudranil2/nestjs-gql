/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateDonationInput {
    count: number;
    displayName: string;
    email: string;
    mobile?: Nullable<string>;
}

export class PaginationProps {
    limit: number;
    page: number;
    sortOrder?: Nullable<string>;
    sortBy?: Nullable<string>;
}

export class Donation {
    id: number;
    count: number;
    displayName: string;
    email: string;
    mobile?: Nullable<string>;
    createdAt?: Nullable<string>;
}

export abstract class IQuery {
    abstract donations(args: PaginationProps): Donation[] | Promise<Donation[]>;

    abstract donation(id: number): Nullable<Donation> | Promise<Nullable<Donation>>;

    abstract totalDonations(): number | Promise<number>;
}

export abstract class IMutation {
    abstract createDonation(createDonationInput: CreateDonationInput): Donation | Promise<Donation>;
}

export abstract class ISubscription {
    abstract totalUpdated(): Nullable<Result> | Promise<Nullable<Result>>;
}

export class Result {
    total: number;
}

type Nullable<T> = T | null;
