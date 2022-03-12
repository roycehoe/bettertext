import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const BASEURL = "http://localhost/api"


export const client: AxiosInstance = axios.create({
    baseURL: BASEURL,
} as AxiosRequestConfig)