//========================================================================

async function catchPokemon(username, ID) {
  const headersObj = {
    username: username,
  };
  try {
    const response = await axios.put(
      `http://localhost:3000/pokemon/catch/${ID}`,
      {},
      {
        headers: headersObj,
      }
    );
    return response.data;
  } catch (error) {
    return false;
  }
}

async function relesePokemon(username, ID) {
  const headersObj = {
    username: username,
  };
  try {
    const response = await axios.delete(
      `http://localhost:3000/pokemon/release/${ID}`,
      {
        headers: headersObj,
      }
    );
    return response.data;
  } catch (error) {
    return false;
  }
}

async function getUsersPokemons(username) {
  const headersObj = {
    username: username,
  };
  try {
    const response = await axios.get("http://localhost:3000/pokemon/", {
      headers: headersObj,
    });
    return response.data;
  } catch (error) {
    return false;
  }
}

async function getPokemonInfoId(username, id) {
  const headersObj = {
    username: username,
  };
  try {
    const response = await axios.get(
      `http://localhost:3000/pokemon/get/${id}`,
      {
        headers: headersObj,
      }
    );
    return response.data;
  } catch (error) {
    return false;
  }
}

async function getPokemonInfoName(username, name) {
  const headersObj = {
    username: username,
  };
  try {
    const response = await axios.get(
      `http://localhost:3000/pokemon/query?query=${name}`,
      {
        headers: headersObj,
      }
    );
    return response.data;
  } catch (error) {
    return false;
  }
}

//=========================================================================

document
  .querySelector("#caught_pokemons_btn")
  .addEventListener("click", OnFindPokemonsClick);
document
  .querySelector("#search_by_id_btn")
  .addEventListener("click", OnSearchIdClick);
document
  .querySelector("#search_by_name_btn")
  .addEventListener("click", OnSearchNameClick);
document.querySelector("#catch_btn").addEventListener("click", OnCatchClick);
document.querySelector("#relese_btn").addEventListener("click", OnReleseClick);

// ===================================
// ======= Event Handlers ============
// ===================================

async function OnFindPokemonsClick() {
  clearValidtions();
  let usernameInput = document.querySelector("#username");
  if (usernameInput.value === "") {
    addError("username", "User name cant be null");
  } else {
    let pokemonsArray = await getUsersPokemons(usernameInput.value);
    if (pokemonsArray) {
      createPokemonList(pokemonsArray);
    } else {
      addError("username", "User name is not exsits");
    }
  }
  //activate();
  // Find pokemons by user name (input)
}

async function OnSearchIdClick() {
  clearValidtions();
  let flag = true;
  let usernameInput = document.querySelector("#username");
  if (usernameInput.value === "") {
    addError("username", "User name cant be null");
    flag = false;
  }
  let idInput = document.querySelector("#findPokemonId");
  if (idInput.value === "") {
    addError("findPokemonId", "ID cant be null");
    flag = false;
  }
  if (flag) {
    let pokemon = await getPokemonInfoId(usernameInput.value, idInput.value);
    if (pokemon) {
      deleteExsitedCard();
      createCard(
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.front_pic,
        pokemon.back_pic,
        pokemon.abilities,
        pokemon.types
      );
    } else {
      addError("findPokemonId", "Couldnt find pokemon");
    }
  }
}

async function OnSearchNameClick() {
  clearValidtions();
  let flag = true;
  let usernameInput = document.querySelector("#username");
  if (usernameInput.value === "") {
    addError("username", "User name cant be null");
    flag = false;
  }
  let nameInput = document.querySelector("#findPokemonName");
  let x = nameInput.value.toString();
  if (nameInput.value === "") {
    addError("findPokemonName", "Name cant be null");
    flag = false;
  } else if (!/^[a-zA-Z]+$/.test(x)) {
    addError("findPokemonName", "Name is not valid");
    flag = false;
  }
  if (flag) {
    let pokemon = await getPokemonInfoName(
      usernameInput.value,
      nameInput.value
    );
    if (pokemon) {
      deleteExsitedCard();
      createCard(
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.front_pic,
        pokemon.back_pic,
        pokemon.abilities,
        pokemon.types
      );
    } else {
      addError("findPokemonName", "Couldnt find pokemon");
    }
  }
}

async function OnCatchClick() {
  clearValidtions();
  let flag = true;
  let usernameInput = document.querySelector("#username");
  if (usernameInput.value === "") {
    addError("username", "User name cant be null");
    flag = false;
  }
  let idInputCatch = document.querySelector("#catchID");
  if (idInputCatch.value === "") {
    addError("catchID", "ID cant be null");
    flag = false;
  }
  if (flag) {
    let pokeon = await catchPokemon(usernameInput.value, idInputCatch.value);
    if (pokeon) {
      idInputCatch.classList.add("is-valid");
      document.getElementById("catchIDSuccess").innerHTML = `captured!`;
    } else {
      addError("catchID", "could not catch");
    }
  }
}

async function OnReleseClick() {
  clearValidtions();
  let flag = true;
  let usernameInput = document.querySelector("#username");
  if (usernameInput.value === "") {
    addError("username", "User name cant be null");
    flag = false;
  }
  let idInputRelese = document.querySelector("#releseID");
  if (idInputRelese.value === "") {
    addError("releseID", "ID cant be null");
    flag = false;
  }
  if (flag) {
    let pokeon = await relesePokemon(usernameInput.value, idInputRelese.value);
    if (pokeon) {
      idInputRelese.classList.add("is-valid");
      document.getElementById("releseIDSuccess").innerHTML = `relesed!`;
    } else {
      addError("releseID", "Havn't caught, cant release");
    }
  }
}

function onMouseEnterImg(event, backImgUrl) {
  event.target.src = backImgUrl;
}

function onMouseLeaveImg(event, imgUrl) {
  event.target.src = imgUrl;
}

// ===================================
// ======= DOM Functions =============
// ===================================

function clearValidtions() {
  document.getElementById("username").classList.remove("is-invalid");
  document.getElementById("findPokemonId").classList.remove("is-invalid");
  document.getElementById("findPokemonName").classList.remove("is-invalid");
  document.getElementById("catchID").classList.remove("is-invalid");
  document.getElementById("releseID").classList.remove("is-invalid");
  document.getElementById("catchID").classList.remove("is-valid");
  document.getElementById("releseID").classList.remove("is-valid");
}

function deleteExsitedCard() {
  if (document.querySelector("#liveCard") !== null) {
    document.querySelector("#liveCard").remove();
  }
}

function addError(inputId, message) {
  document.querySelector(`#${inputId}`).classList.add("is-invalid");
  document.querySelector(`#${inputId}Error`).innerHTML = message;
}

function createCard(
  name,
  Hieght,
  Wieght,
  imgUrl,
  backImgUrl,
  abilities,
  types
) {
  // Big Image - can turn on hover
  /////////////////////////////////
  let img = createElement(
    "img",
    [],
    ["card-img-top"],
    {
      id: "pokImg",
      src: imgUrl,
      alt: "Card image cap",
    },
    {
      mouseenter: (event) => {
        onMouseEnterImg(event, backImgUrl);
      },
      mouseleave: (event) => {
        onMouseLeaveImg(event, imgUrl);
      },
    }
  );

  // Card types - first
  ////////////////////////
  let typesArray = [];
  types.forEach((type) => {
    typesArray.push(
      createElement("p", [`Type: ${type}`], ["card-text"], {
        type: "button",
        style: "margin-left:4px",
      })
    );
  });

  let title = createElement(
    "h5",
    [name.charAt(0).toUpperCase() + name.slice(1)],
    ["card-title"]
  );

  let typesDiv = createElement("div", [title, ...typesArray], ["card-body"]);

  // Card info - second
  ////////////////////////
  let li1 = createElement("li", [`Weight: ${Wieght} Kg`], ["list-group-item"]);
  let li2 = createElement("li", [`Height: ${Hieght} m`], ["list-group-item"]);
  let listInfo = createElement(
    "ul",
    [li1, li2],
    ["list-group", "list-group-flush"]
  );

  // Card ability - third
  ////////////////////////////
  let abilityArray = [];
  abilities.forEach((ability) => {
    abilityArray.push(
      createElement("p", [`ability: ${ability}`], ["card-text"])
    );
  });
  let abilitiesDiv = createElement("div", [...abilityArray], ["card-body"]);

  // Main div
  //////////////////////
  let mainDiv = createElement(
    "div",
    [img, typesDiv, listInfo, abilitiesDiv],
    ["card", "mt-5", "mb-5"],
    {
      style: "width: 18rem; margin: auto",
      id: "liveCard",
    }
  );

  document.querySelector("body").append(mainDiv);
}

function createPokemonList(pokimonNames) {
  let modalBody = document.querySelector("#modalBody");
  modalBody.innerHTML = "";
  let pokimonsArray = [];
  pokimonNames.forEach((pokimon) => {
    pokimonsArray.push(
      createElement("li", [pokimon.name], [], {
        style: "cursor:pointer",
        "data-dismiss": "modal",
      })
    );
  });
  let typesUl = createElement("ul", [...pokimonsArray]);
  modalBody.append(typesUl);
}

function createElement(
  tagName,
  children = [],
  classes = [],
  attributes = {},
  eventListeners = {}
) {
  const myElement = document.createElement(tagName);

  children.map((child) => {
    myElement.append(child);
    return child;
  });

  classes.map((cls) => {
    myElement.classList.add(cls);
    return cls;
  });

  Object.entries(attributes).map(([attr, value]) => {
    myElement.setAttribute(attr, value);
    return attr;
  });

  Object.entries(eventListeners).map(([listener, handler]) => {
    myElement.addEventListener(listener, handler, true);
    return [listener, handler];
  });

  return myElement;
}
