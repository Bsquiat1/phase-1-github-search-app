
// DOM Elements
const searchForm = document.querySelector('#github-form');
const searchInput = document.querySelector('#search');
const userList = document.querySelector('#user-list');
const reposList = document.querySelector('#repos-list');

// GitHub API Endpoints
const userSearchEndpoint = 'https://api.github.com/search/users?q=';
const userReposEndpoint = 'https://api.github.com/users/';

// Event Listener for Form Submission
searchForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Prevent form from submitting

  // Get Search Query
  const searchQuery = searchInput.value.trim();

  // Check if Search Query is Not Empty
  if (searchQuery) {
    // Clear Previous Search Results
    userList.innerHTML = '';
    reposList.innerHTML = '';

    // Search for Users
    fetch(userSearchEndpoint + searchQuery)
      .then((response) => response.json())
      .then((data) => {
        const users = data.items;

        // Display Search Results
        users.forEach((user) => {
          const userCard = document.createElement('li');
          userCard.innerHTML = `
            <img src="${user.avatar_url}" alt="${user.login}">
            <a href="${user.html_url}" target="_blank">${user.login}</a>
          `;
          userCard.addEventListener('click', () => {
            // Get User Repos
            fetch(userReposEndpoint + user.login + '/repos')
              .then((response) => response.json())
              .then((data) => {
                const repos = data;

                // Display User Repos
                reposList.innerHTML = '';
                repos.forEach((repo) => {
                  const repoCard = document.createElement('li');
                  repoCard.innerHTML = `
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                  `;
                  reposList.appendChild(repoCard);
                });
              });
          });
          userList.appendChild(userCard);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
});
