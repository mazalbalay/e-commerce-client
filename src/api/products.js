import axios from "axios";

export async function getProducts() {
    try {
        const response = await axios.get("https://e-commerce-server-3zp6.onrender.com/Product");
        return response;
    } catch (error) {
        return error;
    }
}
export async function getProduct(id) {
    try {
        const response = await axios.get(`https://e-commerce-server-3zp6.onrender.com/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}
export async function editProduct(productId, productObj) {
    try {
        const response = await axios.put(`https://e-commerce-server-3zp6.onrender.com/${productId}`, ...productObj);
        return response;
    } catch (error) {
        return error;
    }
}
export async function createProduct(productObj) {
    try {
        const response = axios.post("https://e-commerce-server-3zp6.onrender.com/Product", ...productObj)
        return response;
    } catch (error) {
        return error;
    }
};
export async function deleteProduct(id) {
    try {
        const response = axios.delete(`https://e-commerce-server-3zp6.onrender.com/${id}`)
        return response;
    } catch (error) {
        return error;
    }
};