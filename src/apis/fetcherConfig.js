import { useFetchWrapper } from "../hooks/fetcherHooks/useFetcherWrapper";

export { useAdminApis };

function useAdminApis() {
  const baseUrl = `${process.env.REACT_APP_API_V1}`;
  const fetchWrapper = useFetchWrapper();

  return {
    fetchHelloWorld,
  };
  function fetchHelloWorld() {
    return fetchWrapper
      .get(`${baseUrl}/admin/post-list`)
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }
}