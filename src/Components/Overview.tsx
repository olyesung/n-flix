import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { API_KEY, BASE_PATH, IGetMovieDetail } from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

export const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
  margin-left: -3vw;
`;

export const Preview_box = styled(motion.div)`
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

export const Preview_Image = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

export const Preview_title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  position: relative;
  top: -80px;
`;

export const Preview_detail = styled.p`
  padding: 20px;
  position: relative;
  top: -80px;
  color: ${(props) => props.theme.white.lighter};
`;

export default function Overview({ overviewMatch, path }: any) {
  const history = useNavigate();
  const onOverlayClick = () => history(-1);
  const { scrollY } = useViewportScroll();
  const channel = overviewMatch.pathname.replace(`/${path}`, "");
  const [detailData, setDetail] = useState<IGetMovieDetail | undefined>();

  function getDetail() {
    return fetch(`${BASE_PATH}${channel}?api_key=${API_KEY}`).then((response) =>
      response.json()
    );
  }

  const { data } = useQuery<IGetMovieDetail>(["channel", "detail"], getDetail);

  useEffect(() => {
    console.log(data);
  }, [onOverlayClick]);

  // useEffect(() => {
  //   setDetail(data);
  //   console.log(data);
  // }, [data]);

  return (
    <>
      <Overlay
        onClick={onOverlayClick}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <Preview_box
        style={{ top: scrollY.get() + 100 }}
        layoutId={overviewMatch.params.channelId}
      >
        {detailData && (
          <>
            <Preview_Image
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  detailData.backdrop_path || detailData.poster_path,
                  "w500"
                )})`,
              }}
            />
            <Preview_title>{detailData.name || detailData.title}</Preview_title>
            <Preview_detail>{detailData.overview}</Preview_detail>
          </>
        )}
      </Preview_box>
    </>
  );
}
