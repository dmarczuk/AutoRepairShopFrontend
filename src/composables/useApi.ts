import axios from '../services/axiosConfig';
import { useState } from 'react';


import {Car, CarClientDto, Client, Mechanic, RepairMechanicDto, TicketDto} from '../models/models';

let ticket = {} as Client;
let ticket2 = {} as TicketDto
let ticket3 = {} as RepairMechanicDto

export const useApi = () => {
    // const navigate = useNavigate();
    const [postRequestError, setPostRequestError] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const sendClient = async (client: Client) => {
        try {
            const response = await axios.post('/add/client', client);
            console.log('Client added successfully:', response.data);
            ticket = response.data;
            setPostRequestError(false);
            setSuccessMessage("Client added successfully");
            //navigate('/ticket');
        } catch (error) {
            console.error('Error adding client:', error);
            if (error) setPostRequestError(true);
            else setPostRequestError(false);
        }
    };

    const sendMechanic = async (mechanic: Mechanic) => {
        try {
            const response = await axios.post('/add/mechanic', mechanic);
            console.log('Mechanic added successfully:', response.data);
            ticket = response.data;
            setPostRequestError(false);
            setSuccessMessage("Mechanic added successfully");
        } catch (error) {
            console.error('Error adding mechanic:', error);
            if (error) setPostRequestError(true);
            else setPostRequestError(false);
        }
    };

    const sendCarClientDto = async (carClientDto: CarClientDto) => {
        try {
            const response = await axios.post('/add/car', carClientDto);
            console.log('Car added successfully:', response.data);
            ticket = response.data;
            setPostRequestError(false);
            setSuccessMessage("Car added successfully");
        } catch (error) {
            console.error('Error adding car:', error);
            if (error) setPostRequestError(true);
            else setPostRequestError(false);
        }
    };

    const sendTicketDto = async (newTicket: TicketDto) => {
        try {
            const response = await axios.post('/add/new/ticket', newTicket);
            console.log('Ticket added successfully:', response.data);
            ticket2 = response.data;
            setPostRequestError(false);
            //navigate('/ticket');
        } catch (error) {
            console.error('Error adding client:', error);
            if (error) setPostRequestError(true);
            else setPostRequestError(false);
        }
    };

    const sendAcceptRepair = async (newTicket: RepairMechanicDto) => {
        try {
            const response = await axios.patch('/accept/repair', newTicket);
            console.log('Repair accepted successfully:', response.data);
            ticket3 = response.data;
            setPostRequestError(false);
            //navigate('/ticket');
        } catch (error) {
            console.error('Error adding client:', error);
            if (error) setPostRequestError(true);
            else setPostRequestError(false);
        }
    };

    return {
        sendClient,
        sendTicketDto,
        sendAcceptRepair,
        sendMechanic,
        sendCarClientDto,
        postRequestError,
        successMessage
    };
};