const standardOptions = {
    credentials: 'include',
    cache: 'no-cache'
};

export const get = url => fetch(url, standardOptions);

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

    return fetch(url, options);
};