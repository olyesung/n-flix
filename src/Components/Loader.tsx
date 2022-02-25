import styled from "styled-components";

const Loading = styled.div`
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loader() {
  return <Loading>Loading...</Loading>;
}
