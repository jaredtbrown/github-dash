import firebase from 'firebase/app';
import 'firebase/auth';

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
        // This is not great, having the github api client being dependent, but it will help users get unstuck if
        // stuff goes wrong, for now.
        if (!response.ok) {
            await firebase.auth().signOut();
        }
        return await response.json();
    }
}

export default GitHubApiClient;
