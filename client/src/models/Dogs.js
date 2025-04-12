import { SERVER_URI } from "../CONST";

export const getDogs = async () => {
    const req = await fetch(`${SERVER_URI}/dogs`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET"
    });
    const result = await req.json();

    return {
        data: result.data
    }
}

export const getDogById = async (id) => {
    const req = await fetch(`${SERVER_URI}/dogs/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "GET"
    });
    const result = await req.json();

    return {
        data: result.data
    }
}

export const createDog = async (newDogData) => {
    const req = await fetch(`${SERVER_URI}/dogs`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newDogData)
    });
    const result = await req.json();

    return {
        data: result.data
    }
}

export const updateDog = async (id, newDogData) => {
    const req = await fetch(`${SERVER_URI}/dogs/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(newDogData)
    });
    const result = await req.json();

    return {
        data: result.data
    }
}

export const deleteDog = async (id) => {
    const req = await fetch(`${SERVER_URI}/dogs/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        method: "DELETE",
    });
    const result = await req.json();

    return {
        data: result.data
    }
}