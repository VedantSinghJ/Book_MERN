const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://bookcollection-backend.onrender.com'
    : 'http://localhost:5555';

export default API_BASE_URL;
