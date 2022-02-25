import { makeImagePath } from "../utils";
import Slider from "../Components/Slider";
import {
  Banner,
  BannerOverview,
  BannerTitle,
  Wrapper,
} from "../Components/Style";
import Loader from "../Components/Loader";

function Movie({ data, isLoading }: any) {
  /**
   * 평점 내림차순
   */
  // movieTopRatedData?.results
  //   .sort((a: any, b: any) => a.vote_average - b.vote_average)
  //   .reverse();
  // /**
  //  * 개봉일 내림차순
  //  */
  // movieUpcomingData?.results
  //   .sort((a: any, b: any) => a.release_date.localeCompare(b.release_date))
  //   .reverse();

  return (
    <Wrapper>
      {isLoading.movieUpcomingLoading ? (
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
              data={data.moviePopularData}
              value={"Popular Movies"}
              path={"movies"}
              channel={"movie"}
            />
          </Banner>

          <Slider
            data={data.movieTopRatedData}
            value={"Top Rated Movies"}
            path={"movies"}
            channel={"movie"}
          />
          <Slider
            data={data.movieUpcomingData}
            value={"Upcoming Movies"}
            path={"movies"}
            channel={"movie"}
          />
        </>
      )}
    </Wrapper>
  );
}

export default Movie;
