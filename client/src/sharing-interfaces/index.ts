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

export interface ICreateHolidayProps {
    history: History;
  }
  interface History {
    push: Function;
  }
  
export interface initialStateHolidayForm {
    destination: string; 
    start_date: Date;
    end_date: Date;
    price: number;
    picture: string;
}

export interface IDeleteDialogProps {
    open: boolean;
    onClose: any;
    holidayId: number;
    destination: string;
}

export interface IEditDialogProps {
    open: any;
    onClose: any;
    holidayId: number;
    destination: string;
    start_date: Date;
    end_date: Date;
    price: number;
    picture: string;
}

export interface IWrappedComponentProps {
    match: Path;
}
interface Path {
    path: string;
}

export interface IHolidaysListProps {
    holidays: Array<Holiday>;
    role: string;
}

export interface InitialStateLoginForm {
    userName: string;
    password: string;
  }
  
export interface ILoginProps extends History {
    history: History;
}

export interface initStateRegisterForm {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

export interface Error {
    message: string;
}
export interface IRegisterProps extends User {
    reduxActions: UpdateUserNameConnected;
    history: History;
}
interface UpdateUserNameConnected {
    updateUserNameConnected: Function;
}
interface User {
    firstName: string;
    role: string;
}

export interface FollowedHoliday {
    destination: string;
    sum_of_followers: number;
}

export interface Action {
    type: string; 
    payload: State;
}

export interface IRoute {
    authorized: string;
    title: string; 
    path: string;
    component: any;
    exact?: boolean;
}

export interface IAppRoutesProps {
    routes: Array<IRoute>
}
  
export interface IAppLinksProps {
    routes: any;
    role: string;
    handleDrawerOpen: Function;
}

export interface IAlertDialogProps {
    open: any;
    onClose: any;
    message: string;
    history: History;
    route: string;
}