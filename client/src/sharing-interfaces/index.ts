export interface State {
    userNameConnected: string;
    holidays: Array<object>;
    holidaysLoading: boolean;
    errMessage: string;
    message: string;
    status: boolean;
}


export interface Holiday {
    id: number;
    from: string;
    to: string;
    destination: string;
    price: number;
    picture: string;
    followers?: number;
}
