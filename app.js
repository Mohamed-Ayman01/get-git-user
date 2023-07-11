let form = document.forms[0];
let nameInput = document.querySelector("form #username");
let submitBtn = document.querySelector("form #submit");

let userInfoCont = document.querySelector(".info-container");
let ProjectsCont = document.querySelector(".projects");

async function getDataOf(user) {
  userInfoCont.innerHTML = "";
  ProjectsCont.innerHTML = "";

  let userData = await fetch(`https://api.github.com/users/${user}`);
  let userResponse = await userData.json();

  // ! Fetching User Bio
  let avatarImg = document.createElement("img");
  avatarImg.className = "avatar";
  avatarImg.src = userResponse.avatar_url;

  let textBox = document.createElement("div");
  textBox.className = "text-box";

  let username = document.createElement("h3");
  username.className = "name";
  username.innerHTML = `<a href="${userResponse.html_url}" target="_blank"><i class="fas fa-link"></i></a> ${userResponse.name}`;
  let userBio = document.createElement("p");
  userBio.className = "bio";
  userBio.textContent = userResponse.bio;

  let stats = document.createElement("div");
  stats.classList.add("stats");

  let followers = document.createElement("div");
  followers.className = "followers";
  followers.innerHTML = `<span>${userResponse.followers}</span> <p>followers</p>`;
  let following = document.createElement("div");
  following.className = "following";
  following.innerHTML = `<span>${userResponse.following}</span> <p>following</p>`;

  stats.append(followers, following);

  textBox.append(username, userBio, stats);

  userInfoCont.append(avatarImg, textBox);

  // ! Fetching User Projects
  let projectsData = await fetch(`https://api.github.com/users/${user}/repos`);
  let projectsResponse = await projectsData.json();

  projectsResponse.forEach(function (element) {
    if (element.fork === false) {
      let item = document.createElement("div");
      item.classList.add("item");

      let projText = document.createElement("div");

      let name = document.createElement("h3");
      name.classList.add("name");
      name.textContent = `${element.name}`;

      let desc = document.createElement("p");
      desc.classList.add("desc");
      desc.textContent = `${element.description ?? "No Description"}`;

      projText.append(name, desc);

      let link = document.createElement("a");
      link.textContent = "view repo";
      link.href = `${element.html_url}`;
      link.target = "_blank";

      item.append(projText, link);
      ProjectsCont.append(item);
    }
  });

  console.log(userResponse);
  console.log(projectsResponse);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  getDataOf(nameInput.value);

  nameInput.value = "";
});
