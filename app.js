let form = document.forms[0];
let nameInput = document.querySelector("form #username");
let submitBtn = document.querySelector("form #submit");

let resBox = document.querySelector(".result-box");
let userInfoCont = document.querySelector(".info-container");
let projectsCont = document.querySelector(".projects");

async function getDataOf(user) {
  userInfoCont.innerHTML = "";
  projectsCont.innerHTML = "";

  // ! Data Fetching
  let userData = await fetch(`https://api.github.com/users/${user}`);
  let projectsData = await fetch(`https://api.github.com/users/${user}/repos`);

  if (userData.ok === true && projectsData.ok === true) {
    resBox.classList.remove("hidden");

    // ! Extracting User Data
    let userResponse = await userData.json();

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

    // ! Extracting User Projects
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
        projectsCont.append(item);
      }
    });

    // console.log(userData);
    // console.log(projectsData);
  } else {
    nameInput.classList.add("wrong-anim");

    if (document.querySelector(".warn") == null) {
      let warnBox = document.createElement("div");
      warnBox.className = "warn";
      warnBox.textContent = "invalid user name";
      warnBox.style = `padding: 1rem; color: red; background-color: var(--dark-black); position: absolute; top: -60px; left: 50%; transform: translateX(-50%); text-transform: capitalize;`;
      document.body.append(warnBox);
    }

    setTimeout(() => {
      document.querySelector(".warn").remove();
      nameInput.classList.remove("wrong-anim");
    }, 3000);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  getDataOf(nameInput.value);

  nameInput.value = "";
});
