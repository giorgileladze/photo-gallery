import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        Authorization: 'Client-ID ' + import.meta.env.VITE_API_TOKEN,
    }
})

export default api;