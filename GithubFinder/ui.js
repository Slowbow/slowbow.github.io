class UI {
    constructor() {
        this.profile = document.getElementById('profile');

    }

    showProfile(user) {
        this.profile.innerHTML = `
        <div class="card">
                <div class="row">
                    <div class="card-image card-content col m3">
                        <img src="${user.avatar_url}">
                        <br>
                        <a href="${user.html_url}" target="blank" class="col s12 btn-small waves-effect waves-light">View profile</a>
                    </div>
                    <div class="card-content col m9">
                        <span class="badge teal accent-1">Public Repos:${user.public_repos}</span>
                        <span class="badge teal accent-2">Gists: ${user.public_gists}</span>
                        <span class="badge teal accent-3">Folowers: ${user.followers}</span>
                        <span class="badge teal accent-4">Folowing: ${user.following}</span>
                        <br><br>
                        <ul class="collection ">
                            <li class="collection-item">Company: ${user.company}</li>
                            <li class="collection-item">Website: ${user.blog}</li>
                            <li class="collection-item">Location: ${user.location}</li>
                            <li class="collection-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
        </div>
        
        <div class="col m3">
            <h5>Latest Repos</h5>
        </div>
        <div id="repos"></div>

        `;
    }


    showRepos(repos) {
        let output = '';
        repos.forEach(function(repo) {
            output += `
            <div class="card">
                <div class="row">
                    <div class="card-content col m6">
                        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </div>
                    <div class="card-content col m6">
                            <span class="badge teal accent-1">Stars:${repo.stargazers_count}</span>
                            <span class="badge teal accent-2">Watchers: ${repo.watchers}</span>
                            <span class="badge teal accent-3">Forks: ${repo.forms_count}</span>
                    </div>
                </div>
            </div>
            `;
        });
        document.getElementById('repos').innerHTML = output;
    }

    //Display alert message
    showAlert(message, className) {
        this.clearAlert();
        const div = document.createElement('div');
        div.className = className;
        div.appendChild(document.createTextNode(message));
        //To insert the message, target element, get parent
        const container = document.querySelector('.searchContainer');
        const searchCard = document.querySelector('.search');
        container.insertBefore(div, searchCard);
        //timeout after 3sec
        setTimeout(()=> {this.clearAlert();}, 3200);
    }

    clearAlert() {
        const currentAlert = document.querySelector('.alert');
        if(currentAlert) {
            currentAlert.remove();
        }
    }
    //Clear profile in UI
    clearProfile() {
        this.profile.innerHTML = '';
    }
}