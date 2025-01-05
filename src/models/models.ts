export interface ThemeType {
    background: string;
    textPrimary: string;
    textSecondary: string;
    textHighlited: string;
    buttonHover: string;
}

export interface Client {
    id: number;
    firstName: string;
    secondName: string;
    phoneNumber: string;
    email: string;
}

export interface Car {
    vehicleRegistration: string;
    mark: string;
    model: string;
    productionYear: number;
    vin: string
}

export interface Mechanic {
    vehicleRegistration: string;
    mark: string;
    ifEmployed: boolean;
    login: string;
    password: string
}

export interface Repair {
    startDate: Date;
    endDate: Date;
    state: string;
    description: string;
    repairProtocol: string;

}