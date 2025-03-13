import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import {AuthProvider} from "./components/AuthContext";

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement); // Create a root instance
    root.render(
        <React.StrictMode>
            <AuthProvider>
                <BrowserRouter> {/* Wrap App in BrowserRouter */}
                    <App />
                </BrowserRouter>
            </AuthProvider>
        </React.StrictMode>
    );
} else {
    console.error('Root element not found. Ensure <div id="root"></div> is in your index.html.');
}