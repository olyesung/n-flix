import { useQuery } from "react-query";
import { useLocation } from "react-router";
import { API_KEY, BASE_PATH, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { AnimatePresence } from "framer-motion";
import { makeImagePath } from "../utils";
import { Box, boxVariants, Info, infoVariants } from "../Components/Slider";
import { useMatch, useNavigate } from "react-router-dom";
import Overview from "../Components/Overview";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader";

const Wrapper = styled.div`
  margin: 13vh 3vw 0 3vw;
  padding-bottom: 4vh;
`;

const Grid_template = styled.div`
  display: grid;
  gap: 0.35vw;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(4, minmax(125px, 17vh));
  width: 93vw;
`;

function Search() {
  const history = useNavigate();
  const location = useLocation();
  const channel = window.location.pathname.split("/")[2];
  const overviewMatch = useMatch(`search/${channel}/:channelId`);
  const keyword = new URLSearchParams(location.search).get("keyword");
  const [copyKeyword, setKeyword] = useState<string | null>("");

  useEffect(() => {
    setKeyword(keyword);
  }, []);

  function getSearch() {
    return fetch(
      `${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`
    ).then((response) => response.json());
  }

  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["search", "multi"],
    getSearch
  );

  const onBoxClicked = (channelId: number, channel: string) => {
    history(`/search/${channel}/${channelId}`);
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid_template>
            {data?.results.map((channel: any) => (
              <Box
                layoutId={channel.id + Date.now()}
                key={channel.id}
                whileHover="hover"
                initial="normal"
                variants={boxVariants}
                onClick={() => onBoxClicked(channel.id, channel.media_type)}
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(
                  channel.backdrop_path || `${channel.poster_path}`
                )}
              >
                <Info variants={infoVariants}>
                  <h4>{channel.name || channel.title}</h4>
                </Info>
              </Box>
            ))}
          </Grid_template>
          <AnimatePresence>
            {overviewMatch ? (
              <Overview path={`search`} overviewMatch={overviewMatch} />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}
export default Search;
