import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
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

function Latest({ data, isLoading }: any) {
  const overviewMatch = useMatch("/latest/:channelId");

  const collectDB: any = [
    data.tvAiringTodayData,
    data.tvPopularData,
    data.moviePopularData,
    data.movieUpcomingData,
  ];

  return (
    <Wrapper>
      {isLoading.tvPopularLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <div style={{ height: "6vh" }}></div>
          <Slider
            data={data.tvAiringTodayData}
            value={"New Episode"}
            path={"latest"}
          />
          <Slider
            data={data.tvPopularData}
            value={"Popular TV Shows"}
            path={"latest"}
          />
          <Slider
            data={data.moviePopularData}
            value={"Popular Movies"}
            path={"latest"}
          />
          <Slider
            data={data.movieUpcomingData}
            value={"Upcoming Movies"}
            path={"latest"}
          />
          <AnimatePresence>
            {overviewMatch ? (
              <Overview
                path={"latest"}
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

export default Latest;
