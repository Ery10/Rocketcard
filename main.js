const nameButton = document.querySelector(".btn-name");
const input = document.querySelector("#input");

nameButton.addEventListener("click", getUser);
input.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    getUser();
  }
});

function getUser() {
  const userName = input.value;
  const url = `https://api.github.com/users/${userName}`;

  axios
    .get(url)
    .then((response) => {
      const user = response.data;
      renderUser(user);
      input.value = ""; // adiciona essa linha para resetar o valor do input
      input.disabled = true;
      nameButton.disabled = true;
      renderColorBackground();
    })
    .catch((error) => {
      console.error(error);
      alert("Usúario não encontrado");
    });
}

function renderUser(user) {
  const followers = user.followers;
  const following = user.following;
  const repos = user.public_repos;
  const company = user.company;
  const location = user.location;
  const nameUser = user.name;
  const avatarUser = user.avatar_url;

  const userInfos = document.querySelectorAll(".info");
  const name = document.querySelector(".title-name");

  const avatar = document.querySelector(".avatar"); // seleciona o elemento <div> com classe "avatar"
  const img = document.createElement("img"); // cria um elemento <img>

  img.src = `${avatarUser}`; // define o atributo "src" da imagem
  img.classList.add("avatar-circle"); // adiciona a classe "avatar-circle" à imagem
  avatar.appendChild(img); // adiciona a imagem ao elemento <div class="avatar">

  name.textContent = nameUser === null ? `` : `${nameUser}`;

  for (let i = 0; i < userInfos.length; i++) {
    userInfos[0].textContent =
      followers < 2 ? `${followers} Seguidor` : `${followers} Seguidores`;
    userInfos[1].textContent = `${following} Seguindo`;
    userInfos[2].textContent =
      repos < 2 ? `${repos} Repositório` : `${repos} Repositórios`;
    userInfos[3].textContent = company === null ? `` : `${company}`;
    userInfos[4].textContent = location === null ? `` : `${location}`;
  }
}

function renderColorBackground() {
  const buttonColor = document.querySelector("#btn");
  const background = document.querySelector(".container-box");
  const colors = [
    "#0000FF",
    "#FFFF00",
    "#FF0000",
    "#FF8C00",
    "#A020F0",
    "#32CD32",
  ];
  let i = 0;

  buttonColor.addEventListener("click", () => {
    background.style.backgroundColor = colors[i];
    i = (i + 1) % colors.length;
  });
}