// check if movie rating is stored in cache, if so, return movie rating, else fetch from API and store in cache
async function getRating(title) {
    if (title.indexOf("-") > -1) title = title.split("-")[0];
    if (title.indexOf(":") > -1) title = title.split(":")[0];

    console.log(title);

    const cachedRating = localStorage.getItem(title);
    if (cachedRating) return cachedRating;

    const apiByTitle = "https://www.omdbapi.com/?&apikey=928415ca&s=";
    const apiByID = "https://www.omdbapi.com/?&apikey=928415ca&i=";

    const URL = apiByTitle + encodeURIComponent(title);

    const data = await fetch(URL, { method: "GET" })
        .then((response) => {
            return response.json();
        })
        .then(async (responseJSON) => {
            if (responseJSON.Error) return "Movie not found";
            if (responseJSON.Search.length >= 1)
                responseJSON = responseJSON.Search[0];

            const id = responseJSON.imdbID;
            const url = apiByID + encodeURIComponent(id);

            const data = await fetch(url, { method: "GET" }).then(
                (response) => {
                    return response.json();
                }
            );
            return data;
        });

    if (data == "Movie not found") {
        localStorage.setItem(title, data);
        return data;
    }

    const rating = data.Ratings.filter(
        (rating) => rating.Source == "Internet Movie Database"
    )[0];

    if (rating) {
        const ratingText = rating.Value.toString();
        localStorage.setItem(title, ratingText);
        return ratingText;
    }

    localStorage.setItem(title, "No rating");
    return "No rating";
}
