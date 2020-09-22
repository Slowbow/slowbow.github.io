class Github {
    constructor() {
        this.client_id = 'b76562168285e7da67d3';
        this.client_secret = 'e6d353715cea969b790811382fac7cd434f7d15a';
        this.repos_count = 5;
        this.repos_sort = 'created: asc';
    }
    async getUser (user) {
        const profileResponse = await fetch (`
        https://api.github.com/users/${user}
        ?client_id=${this.client_id}
        &client_secret=${this.client_secret}`);

        const repoResponse = await fetch (`
        https://api.github.com/users/${user}/repos?per_page=${this.repos_count}
        &sort=${this.repos_sort}
        &client_id=${this.client_id}
        &client_secret=${this.client_secret}`);

        const profile = await profileResponse.json();
        const repos = await repoResponse.json();

        return {
            profile,
            repos
        }
    }
}