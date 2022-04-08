const axios = require("axios");

// Separate api route
const service = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

const nowPlayingMovieList = async () => {
  const res = await service.get("/movie/now_playing", {
    params: {
      api_key: process.env.API_KEY,
    },
  });
  return res;
};

const searchMovie = async (text) => {
  const res = await service.get(`/search/movie?api_key=${process.env.API_KEY}&query=/${text}/`);
  return res;
};

// we need to pass :id inside the route. doesn't works in params. API uses.
// by the w<ay we can use this route for all details. Api has different routes to take info

const movieDetailsId = async (id) => {
  console.log(id);
  const res = await service.get(`/movie/${id}`, {
    params: {
      api_key: process.env.API_KEY,
    },
  });
  return res;
};

const recommendedMovies = () => {
  return service.get("/movie/popular", {
    params: {
      api_key: process.env.API_KEY,
    },
  });
};

// "https://api.themoviedb.org/3/movie/now_playing?api_key="
// "https://api.themoviedb.org/3/movie/popular/list?api_key="

module.exports = {
  nowPlayingMovieList,
  movieDetailsId,
  recommendedMovies,
  searchMovie,
};
