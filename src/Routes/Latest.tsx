import { useQuery } from "react-query";
import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import {
  getMovies,
  getMovie_popualr,
  getMovie_upcoming,
  getTv_airing_today,
  getTv_popular,
  IGetMoviesResult,
  IGetTVResult,
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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
`;

const BigMovie = styled(motion.div)`
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

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

const BigOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

function Latest() {
  const history = useNavigate();
  const onOverlayClick = () => history("/latest");
  const overviewMatch = useMatch("/latest/:channelId");
  const { scrollY } = useViewportScroll();
  // const [collectDB, setCollectDB] = useState<any>(null);

  /**
   * TV 관련 API 불러온다
   */
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["tv", "airing_today"],
    getTv_airing_today
  );
  const { data: tvPopularData, isLoading: tvPopularLoading } =
    useQuery<IGetMoviesResult>(["tv", "popular"], getTv_popular);

  const { data: moviePopularData, isLoading: moviePopularLoading } =
    useQuery<IGetMoviesResult>(["movie", "popular"], getMovie_popualr);

  const { data: movieUpcomingData, isLoading: movieUpcomingLoading } =
    useQuery<IGetMoviesResult>(["movie", "upcoming"], getMovie_upcoming);

  const collectDB: any = [
    data,
    tvPopularData,
    moviePopularData,
    movieUpcomingData,
  ];

  /**
   * Params에서 channelId로 collectDB데이타 배열에서 같은 id를 가진 첫째 값을 불러온다
   */
  const clickedOverview =
    overviewMatch?.params.channelId &&
    collectDB
      ?.map((data: any) =>
        data?.results.filter(
          (channel: any) =>
            String(channel.id) === overviewMatch.params.channelId
        )
      )
      .find((find: any) => find[0])[0];

  return (
    <Wrapper>
      {isLoading && tvPopularLoading && moviePopularLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <div style={{ height: "6vh" }}></div>
          <Slider data={data} value={"New Episode"} />
          <Slider data={tvPopularData} value={"Popular TV Shows"} />
          <Slider data={moviePopularData} value={"Popular Movies"} />
          <Slider data={movieUpcomingData} value={"Upcoming Movies"} />
          <AnimatePresence>
            {overviewMatch ? (
              <>
                <Overlay
                  onClick={onOverlayClick}
                  exit={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
                <BigMovie
                  style={{ top: scrollY.get() + 100 }}
                  layoutId={overviewMatch.params.channelId}
                >
                  {clickedOverview && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                            clickedOverview.backdrop_path ||
                              clickedOverview.poster_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>
                        {clickedOverview.name || clickedOverview.title}
                      </BigTitle>
                      <BigOverview>{clickedOverview.overview}</BigOverview>
                    </>
                  )}
                </BigMovie>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
      <Outlet />
    </Wrapper>
  );
}

export default Latest;
