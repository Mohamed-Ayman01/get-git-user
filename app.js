let form = document.forms[0];
let nameInput = document.querySelector("form #username");
let submitBtn = document.querySelector("form #submit");

let userInfoCont = document.querySelector(".info-container");
let ProjectsCont = document.querySelector(".projects");

async function getDataOf(user) {
  userInfoCont.innerHTML = "";
  ProjectsCont.innerHTML = ""

  let userData = await fetch(`https://api.github.com/users/${user}`);
  let infoResponse = await userData.json();

  // ! Fetching User Bio
  let avatarImg = document.createElement("img");
  avatarImg.className = "avatar";
  avatarImg.src = infoResponse.avatar_url;

  let textBox = document.createElement("div");
  textBox.className = "text-box";

  let username = document.createElement("h2");
  username.className = "name";
  username.textContent = infoResponse.name;
  let userBio = document.createElement("p");
  userBio.className = "bio";
  userBio.textContent = infoResponse.bio;

  let followStats = document.createElement("div");
  followStats.classList.add("follow-stats");

  let followers = document.createElement("div");
  followers.className = "followers";
  followers.innerHTML = `<span>${infoResponse.followers}</span> <p>followers</p>`;
  let following = document.createElement("div");
  following.className = "following";
  following.innerHTML = `<span>${infoResponse.following}</span> <p>following</p>`;

  followStats.append(followers, following);

  textBox.append(username, userBio, followStats);

  userInfoCont.append(avatarImg, textBox);

  // ! Fetching User Projects
  let projectsData = await fetch(`https://api.github.com/users/${user}/repos`);
  let projectsResponse = await projectsData.json();

  projectsResponse.forEach(function (element) {
    if (element.fork === false) {
      let item = document.createElement("div");
      item.classList.add("item");

      let name = document.createElement("h3");
      name.classList.add("name");
      name.textContent = `${element.full_name}`;

      let desc = document.createElement("p");
      desc.classList.add("desc");
      desc.textContent = `${element.description}`;

      let link = document.createElement("a");
      link.textContent = "view";
      link.href = `${element.html_url}`;
      link.target = "_blank";

      item.append(name, desc, link);
      ProjectsCont.append(item);
    }
  });

  console.log(infoResponse);
  console.log(projectsResponse);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  getDataOf(nameInput.value);

  nameInput.value = "";
});
