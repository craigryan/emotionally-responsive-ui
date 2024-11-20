// Domain types

export enum ApplicationStatus {
    ACTIVE = 'ACTIVE',
    PENDING = 'PENDING',
    CLOSED = 'CLOSED',
};

export enum ApplicationType {
    ASSISTED_CALLBACK = 'ASSISTED_CALLBACK', // requires callback and assistence
    MANUAL = 'MANUAL', // user is completing manually
};

export type Application = {
    id: string;
    status: ApplicationStatus;
    applicationType: ApplicationType;
};
