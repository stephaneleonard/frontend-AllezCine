(() => {
  const genre = [
    {
      id: 28,
      name: "Action"
    },
    {
      id: 12,
      name: "Adventure"
    },
    {
      id: 16,
      name: "Animation"
    },
    {
      id: 35,
      name: "Comedy"
    },
    {
      id: 80,
      name: "Crime"
    },
    {
      id: 99,
      name: "Documentary"
    },
    {
      id: 18,
      name: "Drama"
    },
    {
      id: 10751,
      name: "Family"
    },
    {
      id: 14,
      name: "Fantasy"
    },
    {
      id: 36,
      name: "History"
    },
    {
      id: 27,
      name: "Horror"
    },
    {
      id: 10402,
      name: "Music"
    },
    {
      id: 9648,
      name: "Mystery"
    },
    {
      id: 10749,
      name: "Romance"
    },
    {
      id: 878,
      name: "Science Fiction"
    },
    {
      id: 10770,
      name: "TV Movie"
    },
    {
      id: 53,
      name: "Thriller"
    },
    {
      id: 10752,
      name: "War"
    },
    {
      id: 37,
      name: "Western"
    }
  ];
  //bouton login et register
  const login = document.getElementById("login");
  const register = document.getElementById("register");

  //cookies
  function cookies() {
    document.getElementById('cookiesAccept').addEventListener('click',()=>{
      $("#cookies").modal('hide');
    })
    $("#cookies").modal("show");
  }
  function formulaire() {
    $("#myModalLogin").modal("show");
    $("#myModalRegister").modal("hide");
  }
  function formulaireRegister() {
    $("#myModalRegister").modal("show");
    $("#myModalLogin").modal("hide");
  }
  login.addEventListener("click", formulaire);
  register.addEventListener("click", formulaireRegister);
  document
    .getElementById("backToRegister")
    .addEventListener("click", formulaireRegister);
  //**********************JUMBO SECTION************************************
  const displayJumboImages = async cat => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=68275a97be2eef9aba666e601c7b14f8&language=en-US&page=1"
    );
    const data = await response.json();
    const arr = await data.results.slice(0,3);
    console.log(arr)
    document.getElementById('car-1').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${`https://image.tmdb.org/t/p/w500/${arr[0].backdrop_path}`})`;
    document.getElementById('car-2').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${`https://image.tmdb.org/t/p/w500/${arr[1].backdrop_path}`})`;
    document.getElementById('car-3').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url(${`https://image.tmdb.org/t/p/w500/${arr[2].backdrop_path}`})`;

  }
  displayJumboImages();


  //Section featured

  /*
   * Display the featured movie with a category defined
   *  input: nothing
   * output: nothing
   */
  const displayFeatured = async cat => {
    const row = document.getElementById("featuredRow");
    row.innerHTML = "";
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=68275a97be2eef9aba666e601c7b14f8&language=en-US&page=1"
    );
    const data = await response.json();
    const arr = await data.results;
    const filteredArr = cat ? filterFromCategories(arr, cat) : arr;
    //display them
    filteredArr.forEach((e, i) => {
      if (i < 12) {
        const html = document.createElement("div");
        html.classList =
          "card  defaultCard col-lg-2 col-md-6 col-sm-6 col-xs-12 mx-auto";
        html.style = "width: 18rem;";
        html.id = `featured-${e.id}`;
        html.innerHTML = `
      <img src="${`https://image.tmdb.org/t/p/w500/${e.poster_path}`}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <p class="card-text">${e.release_date.slice(0, 4)}</p>
      </div>`;
        document.getElementById("featuredRow").appendChild(html);
      } else {
        const html = document.createElement("div");
        html.classList =
          "card  defaultCard col-lg-2 col-md-6 col-sm-6 col-xs-12 mx-auto hidden";
        html.style = "width: 18rem;";
        html.id = `featured-${e.id}`;
        html.innerHTML = `
      <img src="${`https://image.tmdb.org/t/p/w500/${e.poster_path}`}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <p class="card-text">${e.release_date.slice(0, 4)}</p>
      </div>`;
        document.getElementById("featuredRow").appendChild(html);
      }
    });

    // setup eventListeners for info modal

    document.getElementById("featuredRow").childNodes.forEach(e => {
      e.addEventListener("click", event => {
        displayModalFromClick(
          parseInt(event.srcElement.offsetParent.id.slice(9))
        );
      });
    });
  };

  const filterFromCategories = (arr, cat) => {
    return arr.filter(e => {
      return e.genre_ids.includes(cat);
    });
  };

  // call all function to display data
  displayFeatured(0);

  //add event listeners for change of categories
  document.getElementById("btn-all").addEventListener("click", () => {
    displayFeatured(0);
  });
  document.getElementById("btn-action").addEventListener("click", () => {
    displayFeatured(28);
  });
  document.getElementById("btn-crime").addEventListener("click", () => {
    displayFeatured(80);
  });

  //add Event Listener for the moreOrLess Button
  document.getElementById("moreOrLess").addEventListener("click", () => {
    Array.from(document.getElementById("featuredRow").childNodes).forEach(
      (el, i) => {
        if (i >= 12) el.classList.toggle("hidden");
      }
    );
  });

  //**********************SHOP SECTION************************************

  let currentMovie = 0;
  let moviesArr = [];
  /*
   * Display the shop movies
   *  input: nothing
   * output: nothing
   */
  const displayShop = async () => {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=68275a97be2eef9aba666e601c7b14f8&language=en-US&page=2"
    );
    const data = await response.json();
    const arr = await data.results;
    moviesArr = arr;
    arr.forEach((e, i) => {
      if (i < 8) {
        const html = document.createElement("div");
        html.classList =
          "card  defaultCard col-lg-3 col-md-6 col-sm-6 col-12 mx-auto";
        html.style = "width: 18rem;";
        html.id = `shop-${e.id}`;
        html.innerHTML = `
      <img src="${`https://image.tmdb.org/t/p/w500/${e.poster_path}`}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${e.title}</h5>
        <div class='d-flex'>
        <p class="card-text">${e.release_date.slice(0, 4)} </p>
        <span class='ml-auto text-danger'>15 $</span>
        </div>
        
      </div>`;
        document.getElementById("shop-movies-row").appendChild(html);
      }
    });
    displayCurrentMovieInShop();
  };

  const displayCurrentMovieInShop = async () => {
    //Get movie data from id
    const r = await fetch(
      `https://api.themoviedb.org/3/movie/${moviesArr[currentMovie].id}?api_key=68275a97be2eef9aba666e601c7b14f8&language=en-US
      `
    );
    const d = await r.json();
    let genres = "";
    d.genres.forEach(e => {
      genres += getGenreName(e.id);
    });
    document.getElementById("shop-film-title").innerHTML = d.title;
    document.getElementById("shop-film-stotyline").innerHTML = d.overview;
    document.getElementById("shop-film-date").innerHTML = d.release_date;
    document.getElementById("shop-film-genre").innerHTML = genres;

    //Get movie Video from id
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${moviesArr[currentMovie].id}/videos?api_key=68275a97be2eef9aba666e601c7b14f8&language=en-US`
    );
    const data = await response.json();
    const key = await data.results[0].key;
    document.getElementById(
      "videoIframe"
    ).src = `https://www.youtube.com/embed/${key}`;
  };

  const getGenreName = id => {
    for (let i = 0; i < genre.length; i++) {
      if (genre[i].id == id) return genre[i].name;
    }
  };
  displayShop();

  //add EventListeners

  document.getElementById("goNext").addEventListener("click", e => {
    if (currentMovie < 7) {
      currentMovie++;
      displayCurrentMovieInShop();
    }
  });
  document.getElementById("goBack").addEventListener("click", e => {
    if (currentMovie > 0) {
      currentMovie--;
      displayCurrentMovieInShop();
    }
  });

  //**********************ONCLICK MODAL SECTION************************************
  const displayModalFromClick = async id => {
    //Get movie data from id
    const r = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=68275a97be2eef9aba666e601c7b14f8&language=en-US
      `
    );
    const d = await r.json();
    let genres = "";
    d.genres.forEach(e => {
      genres += getGenreName(e.id);
    });
    document.getElementById("shop-film-title").innerHTML = d.title;
    document.getElementById("shop-film-stotyline").innerHTML = d.overview;
    document.getElementById("shop-film-date").innerHTML = d.release_date;
    document.getElementById("shop-film-genre").innerHTML = genres;

    //Get movie Video from id
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?api_key=68275a97be2eef9aba666e601c7b14f8&language=en-US`
    );
    const data = await response.json();
    const key = await data.results[0].key;
    const html = document.createElement("div");
    html.classList = "modal";
    html.tabIndex = "-1";
    html.role = "dialog";
    html.id = "filmModal";
    html.innerHTML = `
    <div class="modal-dialog" role="document">
    <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title">Film infos</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
        <iframe id='videoIframe' src="https://www.youtube.com/embed/${key}"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                            <div class="container movie-info-block">
                        <h3 id='shop-film-title'>${d.title}</h3>
                        <div class="d-flex flex-row">
                            <h4 class="left-title">Storyline :</h4>
                            <p id='shop-film-stotyline'>${d.overview}</p>
                        </div>

                        <div class="d-flex flex-row">
                            <h4 class="left-title">Released on :</h4>
                            <p id='shop-film-date'> ${d.release_date}</p>
                        </div>
                    </div>
            <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
    </div>
      </div>`;
    document.getElementById("modalContainer").innerHTML = "";
    document.getElementById("modalContainer").appendChild(html);
    $("#filmModal").modal("show");
  };
  // displayModalFromClick(419704);

  //**********************NAVBAR MECHANICS SECTION************************************

  window.onscroll = function() {
    myFunction();
  };

  function myFunction() {
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      document.getElementById("myNav").classList.add("nav-colored");
      document.getElementById('boutonTop').classList.remove("hide-bouton")

    } else {
      document.getElementById("myNav").classList.remove("nav-colored");
      document.getElementById('boutonTop').classList.add("hide-bouton");
    }
    //eventlister of boutonTop
    document.getElementById('boutonTop').addEventListener('click',()=>{
     window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    })
  }

  //**********************Pierre SECTION************************************
  const MOVIES = async function() {
    let data = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?api_key=1f1554fb32330b88285a9c7f0ed8c124&language=en-US&page=1"
    );
    if (data.ok) {
      const dat = await data.json();
      const array = await dat.results;
      let rndmArr = [];
      for (let i = 0; i < 5; i++) {
        let newNmbr = true;
        let number;
        while (newNmbr) {
          number = Math.round(Math.random() * 19);
          if (!rndmArr.includes(number)) {
            newNmbr = false;
          }
        }

        rndmArr.push(number);
        let spanGender = "";
        genre.forEach(gen => {
          if (gen.id == array[number].genre_ids[0]) spanGender = gen.name;
        });
        array[number].genre_ids[0];
        //   array[number].genre_ids.forEach(identity=>{
        //   genre.forEach(gen=>{
        //     if(gen.id==identity)
        //     spanGender= gen.name
        //   })
        // })
        const html = document.createElement("div");
        html.classList =
          "card defaultCard col-lg-2 col-md-2 col-sm-6 col-xs-12 mx-auto";
        html.style = "width: 18rem";
        html.id = `card-${array[number].id}`;
        html.innerHTML = `<img src="${`https://image.tmdb.org/t/p/w500/${array[number].poster_path}`}" class="card-img-top" alt="..."> 
          <div class="card-body"> <h5 class="card-title">${
            array[number].title
          }</h5> 
          <div class='d-flex'>
          <p class="card-text">${array[number].release_date.slice(0, 4)} </p>
          <span class='ml-auto'>${spanGender}</span>
          </div>`;
        document.getElementById("movie").appendChild(html);
      }
    } else {
    }
    // setup eventListeners for info modal

    document.getElementById("movie").childNodes.forEach(e => {
      e.addEventListener("click", event => {
        displayModalFromClick(
          parseInt(event.srcElement.offsetParent.id.slice(5))
        );
      });
    });
  };
  MOVIES();
  cookies();
  /*************************************ici commence la partie contact*******************/
  document.getElementById("sendMessage").addEventListener("click", () => {
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let emailContact = document.getElementById("emailContact").value;
    let subject = document.getElementById("subject").value;
    let textMessage = document.getElementById("textMessage").value;

    if (!firstName || !lastName || !emailContact || !subject || !textMessage) {
      alert("you need to complete each boxes");
    } else {
      alert(
        "resume" +
          "\n" +
          `${firstName} ${lastName}` +
          "\n" +
          `${emailContact} ${subject}` +
          "\n" +
          `${textMessage}`
      );
    }
  });
  /*******************************************footer**************************************/

  const footerMovies = async function() {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?api_key=1f1554fb32330b88285a9c7f0ed8c124&language=en-US&page=1"
    );
    if (data.ok) {
      const dat = await data.json();
      const array = await dat.results;
      const title = Array.from(
        document.getElementsByClassName("latestMovieFooter")
      );
      const image = Array.from(document.getElementsByClassName("footerImage"));

      for (let i = 0; i < 6; i++) {
        title[i].childNodes[1].innerText = array[i].title;
        image[
          i
        ].src = `${`https://image.tmdb.org/t/p/w500/${array[i].poster_path}`}`;
      }
    }
  };
  footerMovies();
})();
