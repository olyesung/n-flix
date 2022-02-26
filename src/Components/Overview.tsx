import styled from "styled-components";
import { motion, useViewportScroll } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import { API_KEY, BASE_PATH, IGetMovieDetail } from "../api";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
  z-index: 1;
  margin-left: -3vw;
`;

const Preview_box = styled(motion.div)`
  position: absolute;
  width: 800px;
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
  height: 500px;
`;

const CloseButton = styled.div`
  position: absolute;
  right: 0;
  color: ${(props) => props.theme.black.lighter};
  background-color: white;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px;
  cursor: pointer;
`;

const Preview_detail = styled.div`
  padding: 20px;
  position: relative;
  top: -80px;
  display: flex;
`;

const Genres = styled.div`
  margin: 12px 40px;
  width: 300px;
  font-size: 14px;
  & :first-child {
    opacity: 0.7;
  }
  & > div {
    margin: 13px 0;
  }
  & > div :first-child {
    opacity: 0.7;
  }
`;

const Title = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  top: -80px;
  position: relative;
  padding: 0 20px;
`;

const RelaseDate = styled.div`
  padding: 20px 5px;
`;

const Preview_overview = styled.p`
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
    setDetail(data);
  }, [getDetail]);

  useEffect(() => {
    setDetail(undefined);
  }, []);

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
            <CloseButton onClick={onOverlayClick}>
              <FontAwesomeIcon
                icon={faCircleXmark}
                fontSize={35}
                style={{ margin: "10px" }}
              />
            </CloseButton>
            <Preview_Image
              style={{
                backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(
                  detailData.backdrop_path || detailData.poster_path,
                  "w500"
                )})`,
              }}
            />
            <Title>{detailData.name || detailData.title}</Title>
            <Preview_detail>
              <div style={{ width: "100%" }}>
                <RelaseDate>
                  {detailData?.release_date?.split("-")[0] ||
                    detailData?.first_air_date?.split("-")[0]}
                </RelaseDate>
                <Preview_overview>{detailData.overview}</Preview_overview>
              </div>
              <Genres>
                <span>Genres:</span>
                {detailData.genres.map((genre, i, arr) =>
                  arr.length - 1 === i ? (
                    <span> {genre.name} </span>
                  ) : (
                    <span> {genre.name}, </span>
                  )
                )}
                <div>
                  <span>Vote Average:</span>{" "}
                  <span>{detailData.vote_average}</span>
                </div>
              </Genres>
            </Preview_detail>
          </>
        )}
      </Preview_box>
    </>
  );
}
