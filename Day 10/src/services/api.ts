import axios from "axios";

export const fakeStoreApi = axios.create({
    baseURL:"https://fakestoreapi.com"
});

export const movieApi = axios.create({
    baseURL:"https://search.imdbot.workers.dev/?q=marvel"
});