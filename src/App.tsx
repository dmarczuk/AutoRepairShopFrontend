import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import AddTicket from "./pages/AddTicketPage/AddTicket";
import Clients from "./pages/ListOfClientsPage/Clients";
// import {useApi} from "./composables/useApi";
import MechanicPage from "./pages/MechanicPage/MechanicPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import HomePage from "./pages/HomePage";
import Repairs from "./pages/ListOfRepairsPage/Repairs";
import Mechanics from "./pages/ListOfMechanicsPage/Mechanics";
import Vehicles from "./pages/ListOfVehiclesPage/Vehicles";
import AddMechanicForm from "./pages/AddMechanicPage/AddMechanicForm";
import AddVehicleForm from "./pages/AddVehiclePage/AddVehicleForm";
import AddClientForm from "./pages/AddClientPage/AddClientForm";

const App: React.FC = () => {
    // const {getClients, listOfClients, getRequestError} = useApi();
    return (
        <div className="app-container">
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/AddTicket" element={<AddTicket />}/>
                    <Route path="/AddMechanicForm" element={<AddMechanicForm />}/>
                    <Route path="/AddVehicleForm" element={<AddVehicleForm />}/>
                    <Route path="/AddClientForm" element={<AddClientForm />}/>
                    <Route path="/Clients" element={<Clients />}/>
                    <Route path="/Vehicles" element={<Vehicles />}/>
                    <Route path="/Mechanics" element={<Mechanics />}/>
                    <Route path="/Repairs" element={<Repairs />}/>
                    <Route path="/MechanicPage" element={<MechanicPage />}/>
                    <Route path="/AdminPage" element={<AdminPage />}/>
                    {/*<Route path="/Kontakt" element={<AddTicket/>}/>*/}
                    {/*<Route path="/Zaloguj" element={<AddTicket/>}/>*/}
                </Routes>
            </div>
        </div>
    );
};

export default App;
