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

export interface Vehicle {
    vehicleRegistration: string;
    mark: string;
    model: string;
    productionYear: number;
    vin: string
}

export interface Mechanic {
    id: string;
    firstName: string;
    secondName: boolean;
    ifEmployed: string;
    username: string;
    password: string
}

export interface Repair {
    repairId: string
    mechanic: Mechanic;
    startDate: string;
    endDate: string;
    state: string;
    description: string;
    repairProtocol: string;
    phoneNumber: string;

}

export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) {
        return ""; // Return an empty string if the input is null or undefined
    }
    return dateString.slice(0, 10); // Extract YYYY-MM-DD
};