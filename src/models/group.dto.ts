export interface GroupDto {
    name: string,
    months: number,
    directionId: number
}

export interface UpdateGroupDto {
    name: string,
    months: number,
    directionId: number
}

export interface GroupResponse {
    id: number;
    name: string;
    months: number;
    direction: {
        id: number;
        name: string;
        status: string,
    } | null;
    teacher: {
        id: number
        name: string;
        surname: string;
        status: string;
    } | null;
    status: string;
}

/**
const groups: {
    name: string;
    status: EntityStatus;
    id: number;
    teacher: {
        name: string;
        surname: string;
        status: EntityStatus;
        id: number;
    } | null;
    direction: {
        name: string;
        status: EntityStatus;
        id: number;
    };
    months: number;
}[]

*/