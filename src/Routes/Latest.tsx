import Slider from "../Components/Slider";
import { Wrapper } from "../Components/Style";
import Loader from "../Components/Loader";

function Latest({ data, isLoading }: any) {
  return (
    <Wrapper>
      {isLoading.tvPopularLoading ? (
        <Loader />
      ) : (
        <>
          <div style={{ height: "6vh" }}></div>
          <Slider
            data={data.tvAiringTodayData}
            value={"New Episode"}
            path={"latest"}
            channel={"tv"}
          />
          <Slider
            data={data.tvPopularData}
            value={"Popular TV Shows"}
            path={"latest"}
            channel={"tv"}
          />
          <Slider
            data={data.moviePopularData}
            value={"Popular Movies"}
            path={"latest"}
            channel={"movie"}
          />
          <Slider
            data={data.movieUpcomingData}
            value={"Upcoming Movies"}
            path={"latest"}
            channel={"movie"}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Latest;
