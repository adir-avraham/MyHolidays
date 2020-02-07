export interface State extends UserConnected {
    userNameConnected: UserConnected;
    holidays: Array<Holiday>;
    holidaysLoading: boolean;
    errMessage: string;
    message: string;
    status: boolean;
}

interface UserConnected {
    firstName: string;
    role: string;
}

export interface Holiday {
    id: number;
    start_date: Date;
    end_date: Date;
    destination: string;
    price: number;
    picture: string;
    followers?: number;
    user_id?: number;
}
