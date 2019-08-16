// init GitHub API library and  UI library
const github = new GitHub();
const ui = new UI();

// Search Input
const searchUser = document.getElementById("searchUser");

// Debounce function
const debounce = (fn, time) => {
  let timeout;

  return function() {
    const functionCall = () => fn.apply(this, arguments);

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};

// Search input event listener
searchUser.addEventListener(
  "keyup",
  debounce(e => {
    // Get input text from search bar
    const userText = e.target.value;
    if (userText !== "") {
      github.getUser(userText).then(userData => {
        if (userData.profile.message === "Not Found") {
          // Show alert
          ui.showAlert("User not found.", "alert alert-danger");
        } else {
          // Show profile
          ui.showProfile(userData.profile);
          ui.showRepos(userData.repos);
        }
      });
    } else {
      // Clear profile display
      ui.clearProfile();
    }
  }, 500)
);
