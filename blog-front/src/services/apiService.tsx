import { toast } from 'react-toastify';

const apiService = async (url: string, data: any, method: string, token: string | null) => {

    const baseUrl = import.meta.env.VITE_URLBACKEND;
    const fullUrl = `${baseUrl}${url}`;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };


    if (token) {
        headers['authorization'] = `${token}`;
    }

    console.log('fullrul', fullUrl)
    console.log('data', data)

    const response = await fetch(fullUrl, {
        method: method,
        headers: headers,
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        toast.error(errorResponse.message)
        throw new Error(`Error: ${response.statusText}`);
    }

    const jsonResponse = await response.json();

    toast.success(jsonResponse.message);
    return jsonResponse
};

export default apiService;