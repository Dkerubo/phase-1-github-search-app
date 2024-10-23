document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from refreshing the page
    const searchValue = document.getElementById('search-input').value;
    
    if (searchValue) {
      searchGitHubUsers(searchValue); // Call function to search for users
    }
  });
  
  function searchGitHubUsers(username) {
    const apiUrl = `https://api.github.com/search/users?q=${username}`;
  
    fetch(apiUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(data => {
      displayUsers(data.items); // Call function to display users
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }
  function displayUsers(users) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results
  
    users.forEach(user => {
      const userDiv = document.createElement('div');
      userDiv.classList.add('user');
      userDiv.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50">
        <a href="${user.html_url}" target="_blank">${user.login}</a>
        <button onclick="fetchUserRepos('${user.login}')">View Repos</button>
      `;
      resultsDiv.appendChild(userDiv);
    });
  }
  function fetchUserRepos(username) {
    const reposUrl = `https://api.github.com/users/${username}/repos`;
  
    fetch(reposUrl, {
      headers: {
        'Accept': 'application/vnd.github.v3+json'
      }
    })
    .then(response => response.json())
    .then(repos => {
      displayRepos(repos); // Call function to display repos
    })
    .catch(error => {
      console.error('Error fetching repos:', error);
    });
  }
  
  function displayRepos(repos) {
    const reposDiv = document.getElementById('repos');
    reposDiv.innerHTML = ''; // Clear previous repos
  
    repos.forEach(repo => {
      const repoDiv = document.createElement('div');
      repoDiv.innerHTML = `
        <a href="${repo.html_url}" target="_blank">${repo.name}</a>
        <p>${repo.description ? repo.description : 'No description available'}</p>
      `;
      reposDiv.appendChild(repoDiv);
    });
  }
  let searchType = 'user'; // Default to user search

document.getElementById('toggle-search').addEventListener('click', function() {
  searchType = searchType === 'user' ? 'repo' : 'user';
  document.getElementById('toggle-search').innerText = searchType === 'user' ? 'Toggle to Repo Search' : 'Toggle to User Search';
});

function searchGitHubUsers(username) {
  const apiUrl = searchType === 'user' 
    ? `https://api.github.com/search/users?q=${username}`
    : `https://api.github.com/search/repositories?q=${username}`;

  fetch(apiUrl, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  })
  .then(response => response.json())
  .then(data => {
    if (searchType === 'user') {
      displayUsers(data.items);
    } else {
      displayRepos(data.items);
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}
