import backendInstance from "./instance";

export const addImage = async (payload) => {
    const { data } = await backendInstance.post("/api/upload", payload, {
        headers: {
            "Content-Type": "multipart/form-data",
        }
    });
    return data;
}