const submitbutton = document.getElementById("submitbutton");
const formEl = document.getElementById("form");


//Takes Movie Title submitted by user and returns Watchmode Api numerical ID for submitted movie
function getId(query, type) {
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
        .then((data) => {
            console.log(data);
            if (data != []){
            let id = data.title_results[0].id;
            console.log(id);
            getStreaminginfo(id)
        }else reject (new err ("No movie found by that name"));
        
        })
        .catch((err) => {
            console.error(err);
        });
}


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
            renderdata(data)
        })
        .catch(err => {
            console.error(err);
        });
}

function renderdata(data) {
    var webStreamingServices = data
        .filter(movie => { 
            if (movie.region == "US" && movie.type =="sub" && movie.web_url != undefined){
                return true;
            } }
        )
        webStreamingServices.forEach(myFunction);
        function myFunction(value){
    console.log(value.web_url)}
}



//Grabs the Title submitted by the user and gives it to getId function. Do we want to allow people to search for TV shows as well? If so, that may be a bit more complicated.
formEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let movieinput = document.getElementById('movieinput').value
    let tvOrMovie = "movie";
    getId(movieinput, tvOrMovie)
})