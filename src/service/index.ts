import axios from "axios";
import {ProductType} from "../types";

export const fetchProducts = () => {
    return axios.get("https://fakestoreapi.com/products");
}

export const createProduct = (data:ProductType) => {
    return axios.post("https://fakestoreapi.com/products", data);
} 

