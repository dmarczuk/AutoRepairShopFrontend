import axios from '../axiosConfig';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {Client, Mechanic} from '../models/models';

 let ticket = {} as Client;
// let listOfClients =

export const useApi = () => {
    const navigate = useNavigate();
    const [postRequestError, setPostRequestError] = useState(false);
    // const [getRequestError, setGetRequestError] = useState(false);
   // const [ticket, setTicket] = useState<Client>({} as Client);
   //  const [listOfClients, setListOfClients] = useState<Client[]>([]); // React state for the client list
   //  const [listOfMechanics, setListOfMechanics] = useState<Mechanic[]>([]); // React state for the client list

    const sendClient = async (client: Client) => {
        try {
            const response = await axios.post('/add/client', client);
            console.log('Client added successfully:', response.data);
            ticket = response.data;
            setPostRequestError(false);
            //navigate('/ticket');
        } catch (error) {
            console.error('Error adding client:', error);
            if (error) setPostRequestError(true);
            else setPostRequestError(false);
        }
    };

    // const getClients = async () => {
    //     try {
    //         const response = await axios.get(`/clients`);
    //         setListOfClients((prevClients) => {
    //             console.log('Previous clients:', prevClients);
    //             console.log('New clients:', response.data);
    //             return response.data;
    //         });
    //         setGetRequestError(false);
    //         console.log("WORKING");
    //         //navigate('/checkResults/results');
    //     } catch (error) {
    //         if (error) setGetRequestError(true);
    //         else setGetRequestError(false);
    //     }
    // };

    // const getMechanics = async () => {
    //     try {
    //         const response = await axios.get(`/mechanics`);
    //         setListOfMechanics((prevMechanics) => {
    //             console.log('Previous mechanic:', prevMechanics);
    //             console.log('New mechanics:', response.data);
    //             return response.data;
    //         });
    //         setGetRequestError(false);
    //         console.log("WORKING");
    //         //navigate('/checkResults/results');
    //     } catch (error) {
    //         if (error) setGetRequestError(true);
    //         else setGetRequestError(false);
    //     }
    // };

    // Fetch the client list when the component loads
    // useEffect(() => {
    //     getClients();
    // }, []);

    // useEffect(() => {
    //     getMechanics();
    // }, []);


    return {
        sendClient,
        // getClients,
        // getMechanics,
        postRequestError,
        // getRequestError,
        // ticket,
        // listOfClients,
        // listOfMechanics
    };
};