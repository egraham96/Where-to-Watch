const submitbutton = document.getElementById("submitbutton");
const formEl = document.getElementById("form");
const errormessage = document.getElementById("errormessage");
const suboptions = document.getElementById("suboptions");
const subheading = document.getElementById("subheading");
const suberror = document.getElementById("suberror");
const addtomovies = document.getElementById("addtomovies");
let imageURL = "";
const addToMoviesHandler = async (event) => {
    event.preventDefault();
        let title = movieinput;
        const response = await fetch('/api/mylist', {
          method: 'POST', 
          body: JSON.stringify({ title , subServiceList, imageURL }), 
          headers: {'Content-Type': 'application/json'}
        });
        if (response.ok) {
          document.location.replace('/api/mylist')
        } else {
          alert(`response not oke ${response.statusText}`)
        }
};


//Takes Movie Title submitted by user and returns Watchmode Api numerical ID for submitted movie
  function  getId(query, type) {
    fetch(
        `https://watchmode.p.rapidapi.com/search/?search_field=name&search_value=${query}&types=${type}`,
        {
            method: "GET",
            headers: {
                "x-rapidapi-key":
                    "be9a60e677msh27b9eb97af299e8p1c5a0djsnb9ba03ed5bd6",
                "x-rapidapi-host": "watchmode.p.rapidapi.com",
            },
        }
    )
        .then(response => response.json())
        .then(async (data) => {
            if (data.title_results.length != 0) {
                //console.log(data);
                //console.log(data.title_results);
                let id = data.title_results[0].id;
                getStreaminginfo(id)
                /*If Watchmode does not have the movie title (and thus its ID) in its database, that means it does not have any streaming options. This throws an error telling user to pick a different movie*/
                /*You can test this by inputting a movie that does not exist*/
                errormessage.textContent = "";
                addtolist.textContent = "Add to Movies";
                //you need to assign the image URL to this variable here
                imageURL = await getImageURL(data.title_results[0].imdb_id);
                console.log (`calling addEventListener with image url ${imageURL}`)
                addtolist.addEventListener('click', addToMoviesHandler);

            } else throw Error('No movie found by that name');
        })
        .catch((err) => {
            console.error(err);
            errormessage.textContent = "No movie found by that name. Please try searching for a different movie. Unfortunately, TV shows are not accepted at this time."
            addtolist.textContent = "";

        });
}
function getImageURL (imdbID) {
    //external_id=imdbID
    apikey2="a5c09845f2af6ed970ae332ca8d551ec"
    fetch(
        `https://api.themoviedb.org/3/find/${imdbID}?api_key=${apikey2}&language=en-US&external_source=imdb_id`)
        .then(response => response.json())
        .then((data) => {
            var path= data.movie_results[0].poster_path;
            imageURL= "https://image.tmdb.org/t/p/w200"+ path;
            return imageURL;
        })
    .catch(err => {
        console.error(err);
        return null;
    });}

function getStreaminginfo(id) {
    fetch("https://watchmode.p.rapidapi.com/title/" + id + "/sources/", {
        "method": "GET",
        "headers": {
            "regions": "US",
            "x-rapidapi-host": "watchmode.p.rapidapi.com",
            "x-rapidapi-key": "be9a60e677msh27b9eb97af299e8p1c5a0djsnb9ba03ed5bd6"
        },
    })
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            /*Checks to make sure the Watchmode API has any streaming options available for the chosen movie in its database*/
            /*For example, Watchmode has the movie Neo Ned in its database, has an ID for it, but has no streaming links for it available (no subscription, rental or buying options)*/
            if (data.length != 0) {
                rendersubdata(data)
                renderrentdata(data)
                renderbuydata(data)
            } else { errormessage.textContent = "No Streaming Options Found! Please try searching for a different movie." }
        })
        .catch(err => {
            console.error(err);
        });
}

let subServiceList = [];
function rendersubdata(data) {
    data = data
        .filter(movie => {
            if (movie.region == "US" && movie.type == "sub" && movie.web_url != undefined) { return true; }
        })
    console.log('subscription array')
    console.log(subscriptionoptions);
    /*Checks to make sure the Watchmode API has any SUBSCRIPTION streaming options available for the chosen movie in its database*/
    /*For example, Watchmode has the movie SpiceGirls in its database, has an ID for it, you can buy or rent movie, but no subscription streaming links available*/

    if (data.length != 0) {
        suboptions.innerHTML = '';
        subServiceList = [];
        data.forEach(value => {
            var list = document.createElement("ul");
            var link = document.createElement("li");
            link.textContent = value.web_url
            list.appendChild(link);
            suboptions.appendChild(list);
            subServiceList.push(value.web_url);
        });
        subheading.textContent = ""
    } else {
        suberror.textContent = "No Subscription Services Links Available"
    }
}

function renderrentdata(data) {
    var rentaloptions = data
        .filter(movie => {
            if (movie.region == "US" && movie.type == "rent" && movie.web_url != undefined) { return true; }
        })
    console.log(rentaloptions);
    /*Checks to make sure the Watchmode API has any RENTAL streaming options available for the chosen movie in its database*/
    /*For example, Watchmode has the movie Bamboozled in its database, has an ID for it, you can buy or rent movie, but no subscription streaming links available*/
    if (rentaloptions.length != 0) {
        rentaloptions.forEach(value => {
            var list2 = document.createElement("ul");
            var link2 = document.createElement("li");
            link2.textContent = value.web_url
            list2.appendChild(link2);
            rentoptions.appendChild(list2);
        });
        rentheading.textContent = ""
    } else {
        renterror.textContent = "No Rental Streaming Links Available"
    }
}

function renderbuydata(data) {
    var buyingoptions = data
        .filter(movie => {
            if (movie.region == "US" && movie.type == "buy" && movie.web_url != undefined) { return true; }
        })
    console.log(buyingoptions);
    /*Checks to make sure the Watchmode API has any BUYING streaming options available for the chosen movie in its database*/
    /*For example, Watchmode has the movie Bamboozled in its database, has an ID for it, you can buy or rent movie, but no subscription streaming links available*/
    if (buyingoptions.length != 0) {
        buyingoptions.forEach(value => {
            var list3 = document.createElement("ul");
            var link3 = document.createElement("li");
            link3.textContent = value.web_url
            list3.appendChild(link3);
            buyoptions.appendChild(list3);
        });
        buyheading.textContent = ""
    } else {
        buyerror.textContent = "No Movie Purchase Options Available"
    }
}


let subscriptionoptions = [];    
let movieinput
//Grabs the Title submitted by the user and gives it to getId function. Do we want to allow people to search for TV shows as well? If so, that may be a bit more complicated.
formEl.addEventListener('submit', function (event) {
    subscriptionoptions = [];
    event.preventDefault();
    movieinput = document.getElementById('movieinput').value
    let tvOrMovie = "movie";
    getId(movieinput, tvOrMovie)
})
