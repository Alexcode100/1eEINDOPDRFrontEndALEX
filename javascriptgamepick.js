let origionalGames = [
    {
      id: 1,
      name: "Red Dead Redemption 2",
      price: "59.99",
      genres: ["Action", "Adventure", "Open world", "Singleplayer"],
      rating: 5,
    },
    {
      id: 2,
      name: "Control",
      price: "29.99",
      genres: ["Action", "Adventure", "Psychological horror"],
      rating: 4,
    },
    {
      id: 3,
      name: "Assassin's Creed Valhalla",
      price: "49.99",
      genres: ["Action", "Adventure", "Open world", "RPG", "Singleplayer"],
      rating: 5,
    },
    {
      id: 4,
      name: "Overwatch",
      price: "19.99",
      genres: ["FPS", "Shooter", "Multiplayer"],
      rating: 4,
    },
    {
      id: 5,
      name: "Genshin Impact",
      price: "0",
      genres: ["Action", "Adventure", "RPG", "Open world", "Singleplayer", "Multiplayer"],
      rating: 3,
    },
    {
      id: 6,
      name: "Subnautica",
      price: "24.99",
      genres: ["Adventure", "Survival", "Open world"],
      rating: 4,
    },
    {
      id: 7,
      name: "Fall Guys: Ultimate Knockout",
      price: "19.99",
      genres: ["Party", "Battle royale", "Multiplayer"],
      rating: 3,
    },
    {
      id: 8,
      name: "Hades",
      price: "24.99",
      genres: ["Action", "RPG", "Singleplayer"],
      rating: 5,
    },
    {
      id: 9,
      name: "Forza Horizon 4",
      price: "39.99",
      genres: ["Racing", "Open world", "Multiplayer"],
      rating: 4,
    },
    {
      id: 10,
      name: "Planet Coaster",
      price: "34.99",
      genres: ["Simulation", "Building", "Management"],
      rating: 4,
    },
  ];
  
  
  let cart = []
  loadGames(origionalGames, "game-list")
  addGenres()
  
  
  
  // PAGE FUNCTIONS
  function addGenres() {
    let genres = []
  
    origionalGames.map(game => {
      game.genres.map(genre => {
        if (!genres.includes(genre)) {
          genres.push(genre)
        }
      })
    })
  
    genres.sort()
  
    genres.map(genre => {
      let item = document.getElementById("genre-dropdown");
      item.options[item.options.length] = new Option(genre, genre);
  
    })
  }
  
  
  // SHOP PAGE FUNCTIONS
  function loadGames(gameLijst, elementName) {
    let gameList = document.getElementById(elementName);
    gameList.innerHTML = "";
    gameLijst.map((game, index) => {
      let item = document.createElement("div");
      item.classList.add("game-box")
      item.innerHTML = `
        <div class="input-container">
            <input type="checkbox" id="${game.id}" name="${game.id}" onclick="manageCart(${game.id})" ${cart.includes(game.id) ? 'checked' : ''}>
        </div>
        <div class="game-container">
            <p>${game.name}</p>
            <p>${parseFloat(game.price) === 0 ? "FREE" : game.price}</p>
        </div>
      `;
      gameList.appendChild(item);
    })
  }
  
  function applyFilter() {
    let genreDropdown = document.getElementById('genre-dropdown').value
    let ratingDropdown = document.getElementById('rating-dropdown').value
    let prijsPicker = document.getElementById('price-input').value
  
    let filteredGames = origionalGames
  
    if (genreDropdown !== 'alle') {
      filteredGames = filteredGames.filter((game) => {
        return game.genres.includes(genreDropdown)
      });
    }
  
    if (ratingDropdown !== 'alle') {
      filteredGames = filteredGames.filter((game) => {
        return game.rating == ratingDropdown
      });
    }
  
    if(prijsPicker !== ""){
      filteredGames = filteredGames.filter((game) => {
        return parseFloat(game.price) <= parseFloat(prijsPicker)
      });
    }  
    loadGames(filteredGames, "game-list")
  }
  
  
  
  
  // WINKELMANDJE PAGE FUNCTIONS
  function manageCart(event) {
    if(!cart.includes(event)){
      cart.push(event)
    } else {
      cart.splice(cart.indexOf(event), 1);
    }
  }
  
  
  function berekenTotaal(){
    let gamePage = document.getElementById('game-page')
    let shopPage = document.getElementById('mandje-page')
  
    let prijsButton = document.getElementById('prijs-totaal')
  
    gamePage.style.display = "none"
    shopPage.style.display = "flex"
  
    let prijs = 0
  
    let gameList = cart.map(id => {
      prijs += parseFloat(origionalGames[id-1].price)
      return origionalGames[id-1]
    })
  
    prijsButton.textContent = prijs === 0 ? "FREE" : prijs
  
    loadGames(gameList, "shop-list")
  }
  
  function terugNaarGamePage(){
    let gamePage = document.getElementById('game-page')
    let shopPage = document.getElementById('mandje-page')
  
    gamePage.style.display = "flex"
    shopPage.style.display = "none"
  }