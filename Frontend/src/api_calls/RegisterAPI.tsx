import axios from "axios";

export const RegisterAPI = async (name: string , email: string , password: string) => {
    const response = await axios.post("http://localhost:5432/api/auth/register", {
        name,
        email,
        password
    });

    if (response.status !== 201) {
        throw new Error(response.data?.message || "Registration failed");
    }

    const data = await response.data;

    localStorage.setItem("token", data.token);

    return data;
}