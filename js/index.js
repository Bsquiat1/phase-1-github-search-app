const form = document.querySelector('#github-form');
form.addEventListener('submit', hanldeSearch);

function handlesearch(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('#search').ariaValueMax;
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
    .then(response => response.json())
    .then(data => {

    })
}
function handleSearch(event) {
    event.preventDefault();
    const searchTerm = document.querySelector('#search').value;
    fetch(`https://api.github.com/search/users?q=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        const userList = document.querySelector('#user-list');
        userList.innerHTML = '';
        data.items.forEach(user => {
          const li = document.createElement('li');
          const avatar = document.createElement('img');
          const username = document.createElement('span');
          const link = document.createElement('a');
  
          avatar.src = user.avatar_url;
          avatar.alt = `${user.login}'s avatar`;
          username.textContent = user.login;
          link.href = user.html_url;
          link.textContent = 'Profile';
  
          li.appendChild(avatar);
          li.appendChild(username);
          li.appendChild(link);
          userList.appendChild(li);
  
          li.addEventListener('click', () => {
            
            fetch(`https://api.github.com/users/${user.login}/repos`)
              .then(response => response.json())
              .then(repos => {
                
              })
            
          });
        });
      })
     
  }
  li.addEventListener('click', () => {
    fetch(`https://api.github.com/users/${user.login}/repos`)
      .then(response => response.json())
      .then(repos => {
        const reposList = document.querySelector('#repos-list');
        reposList.innerHTML = '';
        repos.forEach(repo => {
          const li = document.createElement('li');
          const link = document.createElement('a');
          link.href = repo.html_url;
          link.textContent = repo.name;
          li.appendChild(link);
          reposList.appendChild(li);
        });
      })
     
  });
  