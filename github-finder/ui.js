class UI {
  constructor() {
    this.profile = document.getElementById("profile");
  }

  showProfile(user) {
    this.profile.innerHTML = `
    <div class="card card-body mb-3">
      <div class="row">
        <div class="col-md-3">
          <img src="${user.avatar_url}" class="img-fluid mb-2">
          <a href="${
            user.html_url
          }" target="_blank" class="btn btn-primary btn-block mb-3">View Profile</a>
        </div>
        <div class="col-md-9">
          <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
          <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
          <span class="badge badge-success">Followers: ${user.followers}</span>
          <span class="badge badge-info">Following: ${user.following}</span>
          <br><br>
          <ul class="list-group">
            <li class="list-group-item"><strong>Company:</strong> ${user.company}</li>
            <li class="list-group-item"><strong>Website/Blog:</strong> ${user.blog}</li>
            <li class="list-group-item"><strong>Location:</strong> ${user.location}</li>
            <li class="list-group-item"><strong>Member Since:</strong> ${user.created_at}</li>
          </ul>
        </div>
      </div>
    </div>
    <h3 class="page-heading mb-3">Latest Repos</h3>
    <div id="repos"></div>
    `;
  }

  showRepos(repos) {
    let output = "";
    repos.forEach(repo => {
      output += `
        <li>
          <a href="${repo.url}">${repo.name}</a>&ensp;|&ensp;${
        repo.language
      }&ensp;|&ensp;Last Updated: ${repo.updated_at.slice(0, 10)}
          <br>
      `;

      if (repo.description) {
        output += `
            <p>${repo.description}</p>
          </li>
          <hr>
        `;
      } else {
        output += `
         </li>
         <hr>
        `;
      }
    });

    const repoDisplay = document.getElementById("repos");
    repoDisplay.innerHTML = `<ul>${output}</ul>`;
  }

  showAlert(msg, className) {
    this.clearAlert();
    // create div for alert
    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(msg));

    // get parent and insert alert above search bar
    const container = document.querySelector(".searchContainer");
    const search = document.querySelector(".search");
    container.insertBefore(div, search);

    setTimeout(() => {
      this.clearAlert();
    }, 3500);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearProfile() {
    this.profile.innerHTML = "";
  }
}
