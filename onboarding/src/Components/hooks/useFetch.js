import { useState, useEffect } from "react";
import { getPath } from "../utils.js";

const useFetch = (url, fetchProps, count, message) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, { ...fetchProps, signal: abortCont.signal })
      .then(res => {
        if(!res.ok) {
          throw Error(message || "Wystąpił błąd podczas ładowania danych.");
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


export function useFetchGetSync(apiEndpoint, elementId, errorMsg, abortCont){
  let url = getPath(), errorMessage,
    fetchProps = {method:"GET", headers:{"Accept":"application/json", "Content-Type":"application/json", "X-CSRFToken":""}};

  if(abortCont && abortCont.hasOwnProperty('signal') )
    fetchProps.signal = abortCont.signal;

  if(typeof errorMsg === "string" && errorMsg.length > 0)
    errorMessage = errorMsg;

  url += apiEndpoint + elementId + "/";

  return fetch(url, fetchProps)
    .then(res => {
      if(!res.ok) {
        throw Error(errorMessage);
      }
      return res.json();
    })
    .then(
      (response) => {
        return response;
      },
      (err) => {
        return {error: err};
      })
      .catch(error => {
        return {error: error.message};
      });
}

export default useFetch;

