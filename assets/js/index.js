//--------------PARTIE TRAITANT DES BOUTONS LOGIN REGISTER ET DE LA PARTIE FORMULAIRE
(()=>{
    //bouton login et register
    const login = document.getElementById('login');
    const register = document.getElementById('register');
    const cancellog = document.getElementById('cancelLogin');
    const cancelReg = document.getElementById('cancelRegister')

    //cookies
    $('.modal').modal('show');

    //boutons
    login.addEventListener('click', ()=>{
        document.getElementById("logreg-forms").style.display = "block";
        document.getElementById("registerForm").style.display = "none";
        
    })
    register.addEventListener('click',()=>{
        document.getElementById("registerForm").style.display = "flex";
        document.getElementById("logreg-forms").style.display = "none";
    })
    cancellog.addEventListener('click',()=>{
        document.getElementById("logreg-forms").style.display = "none";
    })
    cancelReg.addEventListener('click',()=>{
        document.getElementById("registerForm").style.display = "none";
    })

    /*---------PARTIE TRAITANT DE LA SECTION FILMS AVEC L'API------------*/
    //tableau des genres
    const GENRES = [
        {
          "id": 28,
          "name": "Action"
        },
        {
          "id": 12,
          "name": "Adventure"
        },
        {
          "id": 16,
          "name": "Animation"
        },
        {
          "id": 35,
          "name": "Comedy"
        },
        {
          "id": 80,
          "name": "Crime"
        },
        {
          "id": 99,
          "name": "Documentary"
        },
        {
          "id": 18,
          "name": "Drama"
        },
        {
          "id": 10751,
          "name": "Family"
        },
        {
          "id": 14,
          "name": "Fantasy"
        },
        {
          "id": 36,
          "name": "History"
        },
        {
          "id": 27,
          "name": "Horror"
        },
        {
          "id": 10402,
          "name": "Music"
        },
        {
          "id": 9648,
          "name": "Mystery"
        },
        {
          "id": 10749,
          "name": "Romance"
        },
        {
          "id": 878,
          "name": "Science Fiction"
        },
        {
          "id": 10770,
          "name": "TV Movie"
        },
        {
          "id": 53,
          "name": "Thriller"
        },
        {
          "id": 10752,
          "name": "War"
        },
        {
          "id": 37,
          "name": "Western"
        }
      ]
      
      const MOVIES = async function(){
          let data = await fetch('https://api.themoviedb.org/3/movie/top_rated?api_key=1f1554fb32330b88285a9c7f0ed8c124&language=en-US&page=1')
          if(data.ok){
              const dat = await data.json();
              const array = await dat.results;
              console.log(array);

              for(let i=0; i<5;i++){
                let number = Math.round(Math.random()*19)
                
                const html = document.createElement("div");
                html.classList = 'card defaultCard col-lg-2 col-md-2 col-sm-6 col-xs-12';
                html.style = 'width: 18rem';
                html.innerHTML = `<img src="${`https://image.tmdb.org/t/p/w500/${array[number].poster_path}`}" class="card-img-top" alt="..."> 
                <div class="card-body"> <h5 class="card-title">${array[number].title}</h5> 
                <p class="card-text">${array[number].release_date.slice(0,4)}</p><span></span> </div>`
                document.getElementById("movie").appendChild(html);
              }
          }else{
              console.error(dat.status);
          }
      }
      MOVIES();
})()

