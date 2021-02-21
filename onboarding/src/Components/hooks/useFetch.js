import { useState, useEffect } from "react";

const useFetch = (url, fetchProps, count) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { ...fetchProps, signal: abortCont.signal })
      .then(res => {
        if(!res.ok) {
          throw Error("Wystąpił błąd podczas ładowania danych.");
        }
        return res.json();
      })
      .then(data => {
        setData(data);
        setError(null);
      })
      .catch(err => {
        if(err.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          setError(err.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => abortCont.abort();
  }, [url, count]);

  return { data, isLoading, error };
}

export default useFetch;