import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMovie_nowplaying,
  getMovie_popualr,
  getMovie_upcoming,
  IGetMoviesResult,
} from "../api";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useNavigate, useMatch, Navigate, Outlet } from "react-router-dom";
import Slider from "../Components/Slider";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;
const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const Overview = styled.p`
  font-size: 30px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
`;

const Preview_box = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black.lighter};
  z-index: 1;
`;

const Preview_Image = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const Preview_title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const Preview_detail = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function Movie() {
  const history = useNavigate();
  const onOverlayClick = () => history("/movies");
  const overviewMatch = useMatch("/movies/:movieId");
  const { scrollY } = useViewportScroll();

  /**
   * Movie 관련 API 불러온다
   */

  const { data: movieNowplayingData, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "now_playing"],
    getMovie_nowplaying
  );
  const { data: moviePopularData, isLoading: moviePopularLoading } =
    useQuery<IGetMoviesResult>(["movie", "popular"], getMovie_popualr);

  const { data: movieUpcomingData, isLoading: movieUpcomingLoading } =
    useQuery<IGetMoviesResult>(["movie", "upcoming"], getMovie_upcoming);

  const { data: movieTopRatedData, isLoading: movieTopRatedLoading } =
    useQuery<IGetMoviesResult>(["movie", "top_rated"], getMovie_upcoming);

  const { data: movieLatestData, isLoading: movieLatestLoading } =
    useQuery<IGetMoviesResult>(["movie", "latest"], getMovie_upcoming);

  const collectDB: any = [
    moviePopularData,
    movieNowplayingData,
    movieUpcomingData,
    movieTopRatedData,
    movieLatestData,
  ];

  console.log(moviePopularData);

  /**
   * 평점 내림차순
   */
  movieTopRatedData?.results
    .sort((a: any, b: any) => a.vote_average - b.vote_average)
    .reverse();
  /**
   * 개봉일 내림차순
   */
  movieUpcomingData?.results
    .sort((a: any, b: any) => a.release_date.localeCompare(b.release_date))
    .reverse();

  /**
   * Params에서 channelId로 collectDB데이타 배열에서 같은 id를 가진 첫째 값을 불러온다
   */
  const clickedOverview =
    overviewMatch?.params.movieId &&
    collectDB
      ?.map((data: any) =>
        data?.results.filter(
          (movie: any) => String(movie.id) === overviewMatch.params.movieId
        )
      )
      .find((find: any) => find[0])[0];

  return (
    <Wrapper>
      {isLoading &&
      moviePopularLoading &&
      movieUpcomingLoading &&
      movieTopRatedLoading &&
      movieLatestLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              movieLatestData?.results[0].backdrop_path || ""
            )}
          >
            <Title>{movieLatestData?.results[0].title}</Title>
            <Overview>{movieLatestData?.results[0].overview}</Overview>
          </Banner>

          <Slider
            data={moviePopularData}
            value={"Popular Movies"}
            path={"movies"}
          />

          <Slider
            data={movieTopRatedData}
            value={"Top Rated Movies"}
            path={"movies"}
          />
          {/* <Slider
            data={movieNowplayingData}
            value={"Now Playing Movies"}
            path={"movies"}
          /> */}
          <Slider
            data={movieUpcomingData}
            value={"Upcoming Movies"}
            path={"movies"}
          />
          <AnimatePresence>
            {overviewMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <Preview_box
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={overviewMatch.params.movieId}
                >
                  {clickedOverview && (
                    <>
                      <Preview_Image
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedOverview.backdrop_path ||
                              clickedOverview.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <Preview_title>
                        {clickedOverview.name || clickedOverview.title}
                      </Preview_title>
                      <Preview_detail>
                        {clickedOverview.overview}
                      </Preview_detail>
                    </>
                  )}
                </Preview_box>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
      <Outlet />
    </Wrapper>
  );
}

export default Movie;
