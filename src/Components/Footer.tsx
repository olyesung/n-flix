import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Container = styled.div`
  height: 25vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 12vh;
`;

const Icons = styled.div`
  height: 6vh;
  width: 50vw;
  display: flex;
  align-items: center;
`;

const Grid_template = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 2.5vh);
  gap: 0.35vw;
  width: 50vw;
  font-size: 12px;
  opacity: 0.8;
`;

const Box = styled.div`
  height: 3vh;
`;

export default function Footer() {
  return (
    <Container>
      <Icons>
        <FontAwesomeIcon
          icon={faFacebookF}
          fontSize={20}
          style={{ margin: "0.7vw" }}
        />
        <FontAwesomeIcon
          icon={faInstagram}
          fontSize={25}
          style={{ margin: "0.7vw" }}
        />
        <FontAwesomeIcon
          icon={faTwitter}
          fontSize={23}
          style={{ margin: "0.7vw" }}
        />
        <FontAwesomeIcon
          icon={faYoutube}
          fontSize={24}
          style={{ margin: "0.7vw" }}
        />
      </Icons>
      <Grid_template>
        <Box>Audio and Subtitles</Box>
        <Box>Audio Description</Box>
        <Box>Help Center</Box>
        <Box>Gift Cards</Box>
        <Box>Media Center</Box>
        <Box>Investor Relations</Box>
        <Box>Jobs</Box>
        <Box>Terms of Use</Box>
        <Box>Privacy</Box>
        <Box>Legal Notices</Box>
        <Box>Cookie Preferences</Box>
        <Box>Corporate Information</Box>
        <Box>Contact Us</Box>
      </Grid_template>
    </Container>
  );
}
