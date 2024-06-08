import { useState, useEffect } from "react";
import axios from "axios";


const useFetch = <T, E=null>(endpoint: string, method: string, query: _IQuery) => {
  const [data, setData] = useState<T|[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<E>(null!);

  const options = {
    method: method || "GET",
    url: endpoint,
    headers: {

    },
    params: { ...query }
  }

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await axios.request<_IFetchRes<T>>(options);

      setData(response.data.data)
      setIsLoading(false);
    } catch (error: any) {
      setError(error.message as E);
      alert("There is an error");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  }

  return { 
    data, isLoading, error, refetch
  }
}

export default useFetch;