import { useMemo, useContext } from "react";
import axios from "axios";

import AuthContext from "../contexts/AuthContext";

const useApi = (baseURL) => {
  const { authToken } = useContext(AuthContext);

  const api = useMemo(() => {
    const apiItem = axios.create({
      baseURL: baseURL || process.env.NEXT_PUBLIC_API_BASE_URL,
      headers: {
        authorization: authToken,
      },
    });

    return apiItem;
  }, [baseURL, authToken]);

  return api;
};

export default useApi;
