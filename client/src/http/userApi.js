import axios from "axios";
import { $host, $authHost } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password, auth_code) => {
    const { data } = await $host.post("registration", {
        name,
        email,
        password,
        auth_code,
    });
    console.log(data);
    if (data.message) {
        return data;
    }
    if (data.errorMessage) {
        return data;
    }
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const login = async (email, password) => {
    const { data } = await $host.post("login", { email, password });
    console.log(data);
    if (data.errorMessage) {
        return data;
    }
    if (data.message) {
        return data;
    }
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const check = async () => {
    const { data } = await $authHost.get("auth", {});
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const update = async (name, email, newEmail, newPassword, avatar) => {
    console.log(avatar)
    let fd = new FormData();
    fd.append("file", avatar);
    fd.append("name", name);
    fd.append("email", email);
    fd.append("newEmail", newEmail);
    fd.append("newPassword", newPassword);

    let data  =await axios({
        method: 'put',
        url: process.env.VUE_APP_API_URL+'update',
        data: fd,
        headers: { "Content-Type": "multipart/form-data",
        "Authorization": `Bearer ${localStorage.token}`
     },
      })
      .then(response => {
        console.log(response.data)
        return response.data;
      })
      .catch(error => {
        console.log(error)
        return error;
      })
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
