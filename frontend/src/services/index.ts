import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export const BASEURL = "https://bettertext.fancybinary.sg/api"


export const client: AxiosInstance = axios.create({
    baseURL: BASEURL,
} as AxiosRequestConfig)