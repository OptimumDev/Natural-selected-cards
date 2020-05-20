const standardOptions = {
    credentials: 'include',
    cache: 'no-cache',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

const standardHandlers = {};

export const setStandardHandler = (code, handler) => standardHandlers[code] = handler;

export const httpGet = url => sendRequest(url, 'GET');

export const httpDelete = url => sendRequest(url, 'DELETE');

export const httpPost = (url, body) => sendRequest(url, 'POST', body);

export const httpPut = (url, body) => sendRequest(url, 'PUT', body);

const sendRequest = (url, method, body) => {
    const options = {
        ...standardOptions,
        method
    };

    if (body !== undefined)
        options.body = JSON.stringify(body);

    return fetch(url, options).then(processResponse, logError);
};

const processResponse = async response => {
    const handler = standardHandlers[response.status];
    if (handler)
        handler(response);
    const body = await response.text();
    return body ? JSON.parse(body) : response;
};

const logError = error => {
    console.log(error)
};