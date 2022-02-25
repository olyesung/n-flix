import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";
import {
  Banner,
  BannerOverview,
  BannerTitle,
  Wrapper,
} from "../Components/Style";
import Loader from "../Components/Loader";

function Tv({ data, isLoading }: any) {
  return (
    <Wrapper>
      {isLoading.tvOnAirLoading ? (
        <Loader />
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
            <Slider
              data={data.tvPopularData}
              value={"Popular TV"}
              path={"tvshow"}
              channel={"tv"}
            />
          </Banner>

          <Slider
            data={data.tvTopRatedData}
            value={"Top Rated TV"}
            path={"tvshow"}
            channel={"tv"}
          />
          <Slider
            data={data.tvAiringTodayData}
            value={"Airing Today"}
            path={"tvshow"}
            channel={"tv"}
          />
          <Slider
            data={data.tvOnAirData}
            value={"On The Air"}
            path={"tvshow"}
            channel={"tv"}
          />
        </>
      )}
    </Wrapper>
  );
}
export default Tv;
