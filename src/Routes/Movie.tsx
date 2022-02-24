import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import { useMatch } from "react-router-dom";
import Slider from "../Components/Slider";
import Overview from "../Components/Overview";

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

const BannerTitle = styled.h2`
  font-size: 68px;
  margin-bottom: 20px; ;
`;

const BannerOverview = styled.p`
  font-size: 30px;
  width: 50%;
`;

function Movie({ data, isLoading }: any) {
  const overviewMatch = useMatch("/movies/:channelId");

  const collectDB: any = [
    data.moviePopularData,
    data.movieTopRatedData,
    data.movieUpcomingData,
  ];

  /**
   * 평점 내림차순
   */
  // movieTopRatedData?.results
  //   .sort((a: any, b: any) => a.vote_average - b.vote_average)
  //   .reverse();
  // /**
  //  * 개봉일 내림차순
  //  */
  // movieUpcomingData?.results
  //   .sort((a: any, b: any) => a.release_date.localeCompare(b.release_date))
  //   .reverse();

  return (
    <Wrapper>
      {isLoading.movieUpcomingLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              data.moviePopularData?.results[0].backdrop_path || ""
            )}
          >
            <BannerTitle>{data.moviePopularData?.results[0].title}</BannerTitle>
            <BannerOverview>
              {data.moviePopularData?.results[0].overview}
            </BannerOverview>
          </Banner>

          <Slider
            data={data.moviePopularData}
            value={"Popular Movies"}
            path={"movies"}
          />

          <Slider
            data={data.movieTopRatedData}
            value={"Top Rated Movies"}
            path={"movies"}
          />
          <Slider
            data={data.movieUpcomingData}
            value={"Upcoming Movies"}
            path={"movies"}
          />
          <AnimatePresence>
            {overviewMatch ? (
              <Overview
                path={"movies"}
                overviewMatch={overviewMatch}
                collectDB={collectDB}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
