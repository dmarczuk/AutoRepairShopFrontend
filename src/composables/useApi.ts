import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Client} from '../models/models';

 let ticket = {} as Client;
// let listOfClients =

export const useApi = () => {
    const navigate = useNavigate();
    const [postRequestError, setPostRequestError] = useState(false);
    const [getRequestError, setGetRequestError] = useState(false);
   // const [ticket, setTicket] = useState<Client>({} as Client);
    const [listOfClients, setListOfClients] = useState<Client[]>([]); // React state for the client list

    const sendClient = async (client: Client) => {
        try {
            const response = await axios.post('/api/add/client', client);
            ticket = response.data;
            setPostRequestError(false);
            //navigate('/ticket');
        } catch (error) {
            if (error) setPostRequestError(true);
            else setPostRequestError(false);
        }
    };

    const getClients = async () => {
        try {
            const response = await axios.get(`/api/clients`);
            setListOfClients(response.data);
            setGetRequestError(false);
            //navigate('/checkResults/results');
        } catch (error) {
            if (error) setGetRequestError(true);
            else setGetRequestError(false);
        }
    };

    // Fetch the client list when the component loads
    useEffect(() => {
        getClients();
    }, []);

    return {
        sendClient,
        getClients,
        postRequestError,
        getRequestError,
        ticket,
        listOfClients
    };
};