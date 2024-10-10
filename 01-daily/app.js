import { Movie } from './movies.js';

const movieForm = document.getElementById('movie-form');
const filterGenre = document.getElementById('filter-genre');
const movieList = document.getElementById('movie-list');

let movies = [];

movieForm.addEventListener('submit', (ev) => {
    ev.preventDefault();

    let title = document.getElementById('title').value;
    let genre = document.getElementById('genre').value;
    let year = document.getElementById('year').value;

    let newMovie = new Movie(title, genre, year);
    movies.push(newMovie);
    movieForm.reset();
    renderMovies();
})

filterGenre.addEventListener('change', renderMovies);

// Rendering movies to DOM
function renderMovies() {
    movieList.innerHTML = '';

    const selectedGenre = filterGenre.value;
    const filteredMovies = selectedGenre ? movies.filter(m => m.genre === selectedGenre) : movies;

    filteredMovies.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = `${movie.title} (${movie.year}) - Жанр: ${movie.genre}`;

        const button = document.createElement('button');
        button.textContent = 'Изтрий';

        button.addEventListener('click', () => {
            movies = movies.filter(m => m !== movie);
            renderMovies();
        });

        li.appendChild(button);
        movieList.appendChild(li);
    })
}

// Async Loading and rendering movies from JSON file
async function loadMovies() {
    const response = await fetch('movies.json');
    const data = await response.json();

    movies = data.map(movieData => new Movie(movieData.title, movieData.genre, movieData.year))
    renderMovies();
}

// Load movies when script load
loadMovies();