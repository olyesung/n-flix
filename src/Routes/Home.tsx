import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import Loader from "../Components/Loader";
import {
  Banner,
  BannerOverview,
  BannerTitle,
  Wrapper,
} from "../Components/Style";

function Home({ data, isLoading }: any) {
  return (
    <Wrapper>
      {isLoading.movieTopRatedLoading ? (
        <Loader />
      ) : (
        <>
          <Banner
            bgPhoto={makeImagePath(
              data.moviePopularData?.results[0].backdrop_path || ""
            )}
          >
            <BannerTitle>{data.moviePopularData?.results[0].title}</BannerTitle>
            <BannerOverview>
              {data.moviePopularData?.results[0].overview}
            </BannerOverview>
            <Slider
              data={data.tvPopularData}
              value={"Popular TV"}
              path={"browse"}
              channel={"tv"}
            />
          </Banner>

          <Slider
            data={data.moviePopularData}
            value={"Popular Movies"}
            path={"browse"}
            channel={"movie"}
          />
          <Slider
            data={data.tvTopRatedData}
            value={"Top Rated TV"}
            path={"browse"}
            channel={"tv"}
          />
          <Slider
            data={data.movieTopRatedData}
            value={"Top Rated Movies"}
            path={"browse"}
            channel={"movie"}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Home;
