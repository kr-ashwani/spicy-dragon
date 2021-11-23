import { useLocation } from "react-router";

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search)
}

export { useQuery };