import axios from "axios";

export const LoginAPI = async (email: string, password: string) => {
    const response = await axios.post("http://localhost:5432/api/auth/Login", {
        email,
        password
    });

    if (response.status !== 200) {
        throw new Error(response.data?.message || "Login failed");
    }

    const data = await response.data;

    localStorage.setItem("token", data.token);

    return data;
}
