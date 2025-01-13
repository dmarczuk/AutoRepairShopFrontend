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
import AddMechanicForm from "./pages/AddMechanicPage/AddMechanicForm";
import AddVehicleForm from "./pages/AddVehiclePage/AddVehicleForm";
import AddClientForm from "./pages/AddClientPage/AddClientForm";
import Cars from "./pages/ListOfVehiclesPage/Cars";
import AcceptationRepair from "./pages/AcceptactionRepairPage/AcceptationRepair";
import PrivateRoute from "./components/PrivateRoute";
import Unauthorized from "./pages/UnauthorizedPage/Unauthorized";
import LoginPage from "./pages/LoginPage/LoginPage";

const App: React.FC = () => {
    return (
        <div className="app-container">
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />}/>
                    <Route path="/AddTicket" element={<AddTicket />}/>
                    <Route path="/AddMechanic" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <AddMechanicForm />
                        </PrivateRoute>
                    }/>
                    <Route path="/AddVehicle" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <AddVehicleForm />
                        </PrivateRoute>
                    }/>
                    <Route path="/AddClient" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <AddClientForm />
                        </PrivateRoute>
                    }/>
                    <Route path="/Clients" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <Clients />
                        </PrivateRoute>
                    }/>
                    <Route path="/Cars" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <Cars />
                        </PrivateRoute>
                    }/>
                    <Route path="/Mechanics" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
                            <Mechanics />
                        </PrivateRoute>
                    }/>
                    <Route path="/Repairs" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <Repairs />
                        </PrivateRoute>
                    }/>
                    <Route path="/AcceptRepair" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <AcceptationRepair />
                        </PrivateRoute>
                    }/>
                    <Route path="/MechanicPage" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN', 'ROLE_MECHANIC']}>
                            <MechanicPage />
                        </PrivateRoute>
                    }/>
                    <Route path="/AdminPage" element={
                        <PrivateRoute allowedRoles={['ROLE_ADMIN']}>
                            <AdminPage />
                        </PrivateRoute>
                    }/>
                    <Route path="/unauthorized" element={<Unauthorized />}/>
                    <Route path="/login" element={<LoginPage />}/>
                    {/*<Route path="/Kontakt" element={<AddTicket/>}/>*/}
                    {/*<Route path="/Zaloguj" element={<AddTicket/>}/>*/}
                </Routes>
            </div>
        </div>
    );
};

export default App;
