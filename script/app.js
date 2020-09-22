const github = new Github;
const ui = new UI;

const searchUser = document.getElementById('searchUser');

//Search input
searchUser.addEventListener('keyup', (e) => {
    //Text input
    const userText = e.target.value;
    
    if (userText !== ''){
    //Http call
    github.getUser(userText).then (data => {  
        if (data.profile.message === 'Not Found') {
            //Alert empty
            ui.showAlert('User not found!!!', 'alert col s12 red white-text'); //ako bude trebalo dodati nesto
        } else {
            //Display profile and repos
            ui.showProfile(data.profile);
            ui.showRepos(data.repos);
        }
        console.log(data);
    })
    } else {
        //Clear profile
    }
});