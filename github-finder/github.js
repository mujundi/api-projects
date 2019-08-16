class GitHub {
  constructor() {
    this.client_id = "9c19e0830d1060628159";
    this.client_secret = "025851090410823b67ddec82195883046eaf217c";
    this.repos_count = 5;
    this.repos_sort = "created: asc";
  }

  async getUser(userName) {
    const userResponse = await fetch(
      `https://api.github.com/users/${userName}?client_id=${this.client_id}&client_secret=${
        this.client_secret
      }`
    );

    const reposResponse = await fetch(
      `https://api.github.com/users/${userName}/repos?per_page=${this.repos_count}&sort=${
        this.repos_sort
      }&client_id=${this.client_id}&client_secret=${this.client_secret}`
    );

    const profile = await userResponse.json();
    const repos = await reposResponse.json();
    return {
      profile,
      repos
    };
  }
}
