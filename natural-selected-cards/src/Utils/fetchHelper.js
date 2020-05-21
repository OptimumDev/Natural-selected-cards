const standardOptions = {
    credentials: 'include',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const standardHandlers = {};
let errorHandler = () => {};

export const setStandardHandler = (code, handler) => standardHandlers[code] = handler;

export const setErrorHandler = handler => errorHandler = handler;

export const httpGet = url => sendRequest(url, 'GET');

export const httpDelete = url => sendRequest(url, 'DELETE');

export const httpPost = (url, body) => sendRequest(url, 'POST', body);

export const httpPut = (url, body) => sendRequest(url, 'PUT', body);

const sendRequest = async (url, method, body) => {
    const options = {
        ...standardOptions,
        method
    };

    if (body !== undefined)
        options.body = JSON.stringify(body);

    try {
        return await fetch(url, options).then(processResponse);
    } catch (e) {
        console.log(e);
        errorHandler(e);
    }
};

const processResponse = async response => {
    const handler = standardHandlers[response.status];
    if (handler)
        handler(response);
    const body = await response.text();
    return body ? JSON.parse(body) : response;
};
