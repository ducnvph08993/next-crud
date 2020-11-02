import axios from "axios";

export default axios.create({
    baseURL: "https://5f5ee4c3df620f00163e504c.mockapi.io/",
    headers: {
        "Content-type": "application/json"
    }
});