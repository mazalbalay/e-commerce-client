import axios from "axios";

export async function getDepartments() {
    try {
        const response = await axios.get("https://e-commerce-server-019n.onrender.com/department");
        return response;
    } catch (error) {
        return error;
    }
}
export async function getDepartment(id) {
    try {
        const response = await axios.get(`https://e-commerce-server-019n.onrender.com/department/${id}`);
        return response;
    } catch (error) {
        return error;
    }
}
export async function editDepartment(id, name, image, description) {
    try {
        const response = await axios.put(`https://e-commerce-server-019n.onrender.com/department/${id}`, {
            name: name,
            image:image,
            description: description,
        });
        return response;
    } catch (error) {
        return error;
    }
}
export async function createDepartment(name, image, description) {
    try {
        const response = axios.post("https://e-commerce-server-019n.onrender.com/department", {
            name: name,
            image:image,
            description: description,
        })
        return response;
    } catch (error) {
        return error;
    }
};
export async function deleteDepartment(id) {
    try {
        const response = axios.delete(`https://e-commerce-server-019n.onrender.com/department/${id}`)
        return response;
    } catch (error) {
        return error;
    }
};