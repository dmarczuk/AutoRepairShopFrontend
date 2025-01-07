import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Client } from '../models/models';

const ClientList: React.FC = () => {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch clients from the backend
    useEffect(() => {
        axios.get<Client[]>('http://localhost:8080/clients')
            .then((response) => {
                setClients(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching clients:', error);
                setLoading(false);
            });
    }, []);

    // Handle delete client
    // const handleDelete = (id: number) => {
    //     const confirmDelete = window.confirm('Do you really want to delete this client?');
    //     if (confirmDelete) {
    //         axios.delete(`http://localhost:8080/api/clients/${id}`)
    //             .then(() => {
    //                 setClients(clients.filter(client => client.id !== id));
    //             })
    //             .catch((error) => {
    //                 console.error('Error deleting client:', error);
    //             });
    //     }
    // };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
    <h1>Client List</h1>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
        <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>First Name</th>
    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Second Name</th>
    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Phone Number</th>
    <th style={{ border: '1px solid #ddd', padding: '8px' }}>Email</th>
    {/*<th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>*/}
    </tr>
    </thead>
    <tbody>
    {clients.map((client) => (
            <tr key={client.id}>
            <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.firstName}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.secondName}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.phoneNumber}</td>
    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{client.email}</td>
    {/*<td style={{ border: '1px solid #ddd', padding: '8px' }}>*/}
    {/*<button*/}
    {/*    onClick={() => handleDelete(client.id)}*/}
    {/*style={{*/}
    {/*    backgroundColor: '#dc3545',*/}
    {/*        color: 'white',*/}
    {/*        border: 'none',*/}
    {/*        padding: '5px 10px',*/}
    {/*        borderRadius: '4px',*/}
    {/*        cursor: 'pointer',*/}
    {/*}}*/}
{/*>*/}
{/*    Usuń*/}
{/*    </button>*/}
{/*    </td>*/}
    </tr>
))}
    </tbody>
    </table>
    </div>
);
};

export default ClientList;