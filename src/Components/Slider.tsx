import styled from "styled-components";
import { motion, AnimatePresence, useViewportScroll } from "framer-motion";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  margin: 5vh 3vw 0 3vw;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider_box = styled.div``;

const Row_header_title = styled.div`
  font-size: 1.4vw;
  font-weight: 600;
`;

const Row = styled(motion.div)`
  display: grid;
  gap: 0.35vw;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: minmax(125px, 17vh);
  position: absolute;
  width: 93vw;
  margin-top: 20px;
`;

const Box = styled(motion.div)<{ bgphoto: string }>`
  background-color: white;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center center;
  font-size: 66px;
  cursor: pointer;
  border-radius: 5px;
  position: relative;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  &:hover {
    z-index: 1;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const HandleNext = styled(motion.span)`
  position: absolute;
  bottom: 0;
  right: -3vw;
  height: 100%;
  width: 2.65vw;
  cursor: pointer;
  display: flex;
  align-items: center;
  opacity: 0.1;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth - 5,
  },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.4,
    transition: {
      delay: 0.3,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.1,
      type: "tween",
    },
  },
};

const NextVariants = {
  hover: {
    opacity: 1,
  },
};

const offset = 6;

export default function Slider({ data, value, path }: any) {
  const history = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const incraseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      console.log(totalMovies, maxIndex);
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  const onBoxClicked = (channelId: number) => {
    history(`/${path}/${channelId}`);
  };

  return (
    <Wrapper>
      {!data ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Slider_box>
            <Row_header_title>{value}</Row_header_title>
            <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
              <Row
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
                key={index}
              >
                {data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((channel: any) => (
                    <Box
                      layoutId={channel.id + Date.now()}
                      key={channel.id}
                      whileHover="hover"
                      initial="normal"
                      variants={boxVariants}
                      onClick={() => onBoxClicked(channel.id)}
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
                <HandleNext
                  onClick={incraseIndex}
                  whileHover="hover"
                  variants={NextVariants}
                >
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    fontSize={35}
                    style={{ margin: "10px" }}
                  />
                </HandleNext>
              </Row>
            </AnimatePresence>
          </Slider_box>
        </>
      )}
    </Wrapper>
  );
}
