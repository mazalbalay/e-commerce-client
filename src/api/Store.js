import axios from "axios";

export async function getStores() {
    try {
        const response = await axios.get("https://e-commerce-server-019n.onrender.com/store");
        return response;
    } catch (error) {
        return error;
    }
}
export async function getStore(id) {
    try {
        const response = await axios.get(`https://e-commerce-server-019n.onrender.com/store/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}
export async function editStore(id, name,MangerName, image, description, department, location, rating) {
    try {
        const response = await axios.put(`https://e-commerce-server-019n.onrender.com/store/${id}`, {
            name: name,
            MangerName :MangerName,
            image,
            description: description,
            department: department,
            location: location,
            rating: rating,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export async function createStore(name,MangerName, image, description, department, location, rating) {
    try {
        const response = axios.post("https://e-commerce-server-019n.onrender.com/store", {
            name: name,
            MangerName:MangerName,
            image,
            description: description,
            department: department,
            location: location,
            rating: rating,
        })
        return response;
    } catch (error) {
        return error;
    }
};
export async function deleteStore(id) {
    try {
        const response = axios.delete(`https://e-commerce-server-019n.onrender.com/store/${id}`)
        return response;
    } catch (error) {
        return error;
    }
};