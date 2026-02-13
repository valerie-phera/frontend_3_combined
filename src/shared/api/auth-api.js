import backendInstance from "./instance";

export const registrPasswordApi = async (password) => {
    const { data } = await backendInstance.post("/auth/register/password", {
        password
    });

    return data; 
};

export const registrNameApi = async (token, name) => {
    const { data } = await backendInstance.post("/auth/register/name", {
        token,
        name
    });

    return data;
};


export const loginApi = async ({ username, password }) => {
    const { data } = await backendInstance.post("/auth/login", {
        username,
        password
    });

    return data; // backend has to return token
};

