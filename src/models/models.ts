export interface ThemeType {
    background: string;
    textPrimary: string;
    textSecondary: string;
    textHighlited: string;
    buttonHover: string;
}

export interface Client {
    clientId: number;
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

export interface CarClientDto {
    car: Car;
    phoneNumber: string
}

export interface Mechanic {
    mechanicId: number;
    firstName: string;
    secondName: string;
    ifEmployed: string;
    username: string;
    password: string
}

export interface Repair {
    repairId: string
    mechanic: Mechanic;
    car: Car;
    startDate: string;
    endDate: string;
    state: string;
    description: string;
    repairProtocol: string;
    phoneNumber: string;

}

export interface TicketDto {
    client: Client;
    car: Car;
}

export interface RepairMechanicDto {
    repairId: number;
    mechanicUsername: string;
}

export interface LoginRequest {
    username: string;
    password: string
}

export const formatDate = (dateString: string | null | undefined): string => {
    if (!dateString) {
        return ""; // Return an empty string if the input is null or undefined
    }
    return dateString.slice(0, 10); // Extract YYYY-MM-DD
};

export const formatUsername = (mechanic: Mechanic | null | undefined): string => {
    if (!mechanic) {
        return ""; // Return an empty string if the input is null or undefined
    }
    return mechanic.username; // Extract YYYY-MM-DD
};