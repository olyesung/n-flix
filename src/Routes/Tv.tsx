import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { useMatch } from "react-router-dom";
import Slider from "../Components/Slider";
import Overview from "../Components/Overview";
import { makeImagePath } from "../utils";

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

function Tv({ data, isLoading }: any) {
  const overviewMatch = useMatch("/tv/:channelId");

  const collectDB: any = [
    data.tvPopularData,
    data.tvTopRatedData,
    data.tvAiringTodayData,
    data.tvOnAirData,
  ];

  return (
    <Wrapper>
      {isLoading.tvOnAirLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              data.tvPopularData?.results[0].backdrop_path || ""
            )}
          >
            <BannerTitle>{data.tvPopularData?.results[0].name}</BannerTitle>
            <BannerOverview>
              {data.tvPopularData?.results[0].overview}
            </BannerOverview>
          </Banner>

          <Slider data={data.tvPopularData} value={"Popular TV"} path={"tv"} />
          <Slider
            data={data.tvTopRatedData}
            value={"Top Rated TV"}
            path={"tv"}
          />
          <Slider
            data={data.tvAiringTodayData}
            value={"Airing Today"}
            path={"tv"}
          />
          <Slider data={data.tvOnAirData} value={"On The Air"} path={"tv"} />

          <AnimatePresence>
            {overviewMatch ? (
              <Overview
                path={"tv"}
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
export default Tv;
