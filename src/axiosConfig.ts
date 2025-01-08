import axios from 'axios';

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:8080';

// Optionally, set other default configurations (e.g., headers, timeouts)
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;