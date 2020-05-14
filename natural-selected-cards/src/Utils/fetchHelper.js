const standardOptions = {
    credentials: 'include',
    cache: 'no-cache'
};

const standardHandlers = {};

export const setStandardHandler = (code, handler) => standardHandlers[code] = handler;

export const get = url => sendRequest(url, standardOptions);

export const post = (url, body) => {
    const options = {
        ...standardOptions,
        method: 'POST'
    };

    if (body !== undefined) {
        options.headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        options.body = JSON.stringify(body);
    }

    return sendRequest(url, options);
};

const sendRequest = (url, options) => fetch(url, options).then(processResponse, logError);

const processResponse = response => {
    const handler = standardHandlers[response.status];
    if (handler)
        handler(response);
    return response;
};

const logError = error => {
    console.log(error)
};