import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const BASEURL = "http://localhost:8000/"


export const client: AxiosInstance = axios.create({
    baseURL: BASEURL,
} as AxiosRequestConfig)