import { $host, $authHost } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (name, email, password) => {
    const { data } = await $host.post("registration", {
        name,
        email,
        password,
    });
    console.log(data);
    if(data.message){
        return data
    }
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const login = async (email, password) => {
    const { data } = await $host.post("login", { email, password });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const check = async () => {
    const { data } = await $authHost.get("auth", {});
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
export const update = async (
    name,
    surname,
    email,
    newemail,
    password,
    newpassword
) => {
    const { data } = await $authHost.put("update", {
        name,
        surname,
        email,
        newemail,
        password,
        newpassword,
    });
    localStorage.setItem("token", data.token);
    return jwt_decode(data.token);
};
