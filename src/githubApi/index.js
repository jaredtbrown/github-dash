export const get = (url) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('no token');
    }

    const options = {
        headers: {
            'Authorization': `token ${token}`, 
        },
    };

    return fetch(url, options);
};