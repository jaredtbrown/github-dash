class GitHubApiClient {
    baseUrl = 'https://api.github.com';

    constructor(token) {
        this.token = token;
    }

    get(url) {
        return this.callApi('GET', url);
    }

    async callApi(method, url) {
        const options = {
            method,
            headers: {
                'Authorization': `token ${this.token}`, 
            },
        };

        const response = await fetch(`${this.baseUrl}${url}`, options);
        return await response.json();
    }
}

export default GitHubApiClient;