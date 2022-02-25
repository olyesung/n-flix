import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Latest from "./Routes/Latest";
import Footer from "./Components/Footer";
import {
  getMovie_popualr,
  getMovie_topRated,
  getMovie_upcoming,
  getTv_airingToday,
  getTv_onTv,
  getTv_popular,
  getTv_topRated,
  IGetMoviesResult,
} from "./api";
import { useQuery } from "react-query";

function App() {
  // Movie
  const { data: moviePopularData, isLoading: moviePopularLoading } =
    useQuery<IGetMoviesResult>(["movies", "popular"], getMovie_popualr);

  const { data: movieUpcomingData, isLoading: movieUpcomingLoading } =
    useQuery<IGetMoviesResult>(["movies", "upcoming"], getMovie_upcoming);

  const { data: movieTopRatedData, isLoading: movieTopRatedLoading } =
    useQuery<IGetMoviesResult>(["movies", "top_rated"], getMovie_topRated);

  // TV
  const { data: tvPopularData, isLoading: tvPopularLoading } =
    useQuery<IGetMoviesResult>(["tv", "popular"], getTv_popular);

  const { data: tvTopRatedData, isLoading: tvTopRatedLoading } =
    useQuery<IGetMoviesResult>(["tv", "top_rated"], getTv_topRated);

  const { data: tvAiringTodayData, isLoading: tvAiringTodayLoading } =
    useQuery<IGetMoviesResult>(["tv", "airing_today"], getTv_airingToday);

  const { data: tvOnAirData, isLoading: tvOnAirLoading } =
    useQuery<IGetMoviesResult>(["tv", "on_the_air"], getTv_onTv);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/*"
          element={
            <Home
              data={{
                tvPopularData,
                moviePopularData,
                tvTopRatedData,
                movieTopRatedData,
              }}
              isLoading={{
                tvPopularLoading,
                moviePopularLoading,
                tvTopRatedLoading,
                movieTopRatedLoading,
              }}
            />
          }
        ></Route>
        <Route
          path="/tvshow/*"
          element={
            <Tv
              data={{
                tvPopularData,
                tvTopRatedData,
                tvAiringTodayData,
                tvOnAirData,
              }}
              isLoading={{
                tvPopularLoading,
                tvTopRatedLoading,
                tvAiringTodayLoading,
                tvOnAirLoading,
              }}
            />
          }
        ></Route>
        <Route
          path="/movies/*"
          element={
            <Movie
              data={{ moviePopularData, movieTopRatedData, movieUpcomingData }}
              isLoading={{
                moviePopularLoading,
                movieTopRatedLoading,
                movieUpcomingLoading,
              }}
            />
          }
        ></Route>
        <Route
          path="/latest/*"
          element={
            <Latest
              data={{
                tvPopularData,
                moviePopularData,
                tvAiringTodayData,
                movieUpcomingData,
              }}
              isLoading={{
                moviePopularLoading,
                movieUpcomingLoading,
                tvPopularLoading,
                tvAiringTodayLoading,
              }}
            />
          }
        ></Route>
        <Route path="/search/*" element={<Search />}></Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
