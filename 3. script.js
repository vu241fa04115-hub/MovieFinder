const movies = [
    {
        id: 1,
        title: "Inception",
        year: 2010,
        genre: "Sci-Fi",
        rating: 8.8,
        emoji: "🌀",
        color: "#4c1d95",
        description:
            "A skilled thief who steals secrets through dream-sharing technology is given a chance to erase his past by planting an idea into someone's mind."
    },

    {
        id: 2,
        title: "Avengers",
        year: 2012,
        genre: "Action",
        rating: 8.0,
        emoji: "🦸",
        color: "#991b1b",
        description:
            "Earth's greatest heroes come together to fight a powerful enemy threatening the planet."
    },

    {
        id: 3,
        title: "Interstellar",
        year: 2014,
        genre: "Sci-Fi",
        rating: 8.7,
        emoji: "🚀",
        color: "#1e3a8a",
        description:
            "A team of explorers travels through a wormhole in space in search of a new home for humanity."
    },

    {
        id: 4,
        title: "The Dark Knight",
        year: 2008,
        genre: "Action",
        rating: 9.0,
        emoji: "🦇",
        color: "#111827",
        description:
            "Batman faces a criminal mastermind who creates chaos across Gotham City."
    },

    {
        id: 5,
        title: "Toy Story",
        year: 1995,
        genre: "Animation",
        rating: 8.3,
        emoji: "🤠",
        color: "#0369a1",
        description:
            "A group of toys come to life when humans are not around and experience an exciting adventure."
    },

    {
        id: 6,
        title: "The Hangover",
        year: 2009,
        genre: "Comedy",
        rating: 7.7,
        emoji: "🍺",
        color: "#ca8a04",
        description:
            "Three friends travel to Las Vegas for a bachelor party and wake up with no memory of what happened."
    },

    {
        id: 7,
        title: "Titanic",
        year: 1997,
        genre: "Drama",
        rating: 7.9,
        emoji: "🚢",
        color: "#075985",
        description:
            "A young couple from different social classes fall in love aboard the legendary Titanic."
    },

    {
        id: 8,
        title: "Spider-Man",
        year: 2002,
        genre: "Action",
        rating: 7.4,
        emoji: "🕷️",
        color: "#b91c1c",
        description:
            "A teenager gains incredible powers and learns that great power comes with great responsibility."
    },

    {
        id: 9,
        title: "Joker",
        year: 2019,
        genre: "Drama",
        rating: 8.3,
        emoji: "🤡",
        color: "#713f12",
        description:
            "A troubled man slowly transforms into a dangerous criminal figure in Gotham City."
    },

    {
        id: 10,
        title: "Frozen",
        year: 2013,
        genre: "Animation",
        rating: 7.4,
        emoji: "❄️",
        color: "#0369a1",
        description:
            "A young princess sets out on a journey to find her sister and save their kingdom."
    }
];


let favorites =
    JSON.parse(localStorage.getItem("movieFavorites")) || [];


function displayMovies(data = movies) {

    const grid =
        document.getElementById("movieGrid");

    grid.innerHTML = "";

    if (data.length === 0) {

        grid.innerHTML =
            `<div class="empty">
                😔 No movies found
            </div>`;

        return;
    }

    data.forEach(movie => {

        const isFavorite =
            favorites.includes(movie.id);

        grid.innerHTML += `

            <div class="movie-card">

                <div
                    class="poster"
                    style="background:${movie.color}">
                    ${movie.emoji}
                </div>

                <div class="movie-info">

                    <h3>${movie.title}</h3>

                    <div class="meta">
                        ${movie.year}
                        •
                        ${movie.genre}
                    </div>

                    <div class="rating">
                        ⭐ ${movie.rating}
                    </div>

                    <div class="genre">
                        ${movie.genre}
                    </div>

                    <div class="card-buttons">

                        <button
                            class="details-btn"
                            onclick="showDetails(${movie.id})">
                            Details
                        </button>

                        <button
                            class="favorite-btn"
                            onclick="toggleFavorite(${movie.id})">

                            ${isFavorite ? "❤️" : "♡"}

                        </button>

                    </div>

                </div>

            </div>

        `;
    });
}


function searchMovies() {

    const query =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();

    const results =
        movies.filter(movie =>
            movie.title
                .toLowerCase()
                .includes(query)
        );

    displayMovies(results);
}


document
    .getElementById("searchInput")
    .addEventListener("keyup", function(event) {

        if (event.key === "Enter") {
            searchMovies();
        }

    });


function filterMovies() {

    const genre =
        document.getElementById("genreFilter").value;

    if (genre === "all") {

        displayMovies(movies);

        return;
    }

    const results =
        movies.filter(movie =>
            movie.genre === genre
        );

    displayMovies(results);
}


function toggleFavorite(id) {

    if (favorites.includes(id)) {

        favorites =
            favorites.filter(movieId => movieId !== id);

    } else {

        favorites.push(id);

    }

    localStorage.setItem(
        "movieFavorites",
        JSON.stringify(favorites)
    );

    displayMovies();
    displayFavorites();
}


function displayFavorites() {

    const grid =
        document.getElementById("favoriteGrid");

    grid.innerHTML = "";

    const favoriteMovies =
        movies.filter(movie =>
            favorites.includes(movie.id)
        );

    if (favoriteMovies.length === 0) {

        grid.innerHTML =
            `<div class="empty">
                ❤️ You haven't added any favorite movies yet.
            </div>`;

        return;
    }

    favoriteMovies.forEach(movie => {

        grid.innerHTML += `

            <div class="movie-card">

                <div
                    class="poster"
                    style="background:${movie.color}">
                    ${movie.emoji}
                </div>

                <div class="movie-info">

                    <h3>${movie.title}</h3>

                    <div class="meta">
                        ${movie.year} • ${movie.genre}
                    </div>

                    <div class="rating">
                        ⭐ ${movie.rating}
                    </div>

                    <div class="card-buttons">

                        <button
                            class="details-btn"
                            onclick="showDetails(${movie.id})">
                            Details
                        </button>

                        <button
                            class="favorite-btn"
                            onclick="toggleFavorite(${movie.id})">
                            ❤️
                        </button>

                    </div>

                </div>

            </div>

        `;
    });
}


function showDetails(id) {

    const movie =
        movies.find(movie => movie.id === id);

    const modal =
        document.getElementById("movieModal");

    const content =
        document.getElementById("modalContent");

    content.innerHTML = `

        <div
            class="modal-poster"
            style="background:${movie.color}">
            ${movie.emoji}
        </div>

        <h2>${movie.title}</h2>

        <p>
            📅 ${movie.year}
            &nbsp;&nbsp;
            🎭 ${movie.genre}
            &nbsp;&nbsp;
            ⭐ ${movie.rating}
        </p>

        <p>
            ${movie.description}
        </p>

    `;

    modal.style.display = "flex";
}


function closeModal() {

    document.getElementById("movieModal")
        .style.display = "none";

}


window.onclick = function(event) {

    const modal =
        document.getElementById("movieModal");

    if (event.target === modal) {

        modal.style.display = "none";

    }

};


document
    .getElementById("themeBtn")
    .addEventListener("click", function() {

        document.body.classList.toggle("light");

        if (
            document.body.classList.contains("light")
        ) {

            this.innerText = "☀️";

        } else {

            this.innerText = "🌙";

        }

    });


displayMovies();
displayFavorites();