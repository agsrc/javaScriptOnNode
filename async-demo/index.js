console.log('Before');
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    })
  })
});

getUser(1) // main object
    .then(user => getRepositories(user.name)) // return another promise
    .then(repos => getCommits(repos[0])) // returns another promise
    .then(commits => console.log('commits',commits)) // chaining ends here  with last promise
    .catch(err=> console.log('error',err.message));
    console.log('After');

function getUser(id) {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({ id: id, gitHubUsername: 'mosh' });
          }, 2000);
    });

}

function getRepositories(username) {
    return new Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['repo1', 'repo2', 'repo3']);
  }, 2000);}
  );
}

function getCommits(repo) {
    return new Promise((resolve,reject)=>{
  setTimeout(() => {
    console.log('Calling GitHub API...');
    resolve(['commit']);
  }, 2000);
});
}