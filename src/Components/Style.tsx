import styled from "styled-components";

export const Wrapper = styled.div`
  background-color: black;
`;

export const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: end;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

export const BannerTitle = styled.h2`
  font-size: 68px;
  padding: 2vh 3vw;
`;

export const BannerOverview = styled.p`
  font-size: 30px;
  width: 50%;
  padding-left: 3vw;
`;
