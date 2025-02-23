import { useState, useEffect } from "react";
import axios from "axios";

const useFlip = (initialFlipState = true) => {
  const [isFlipped, setFlipped] = useState(initialFlipState);

  const flip = () => {
    setFlipped((isUp) => !isUp);
  };
  return [isFlipped, flip];
};

const useAxios = (keyInLs, baseUrl) => {
  const [response, setResponses] = useLocalStorage(keyInLs);

  const addResponseData = async (
    formatter = (data) => data,
    restOfUrl = ""
  ) => {
    const response = await axios.get(`${baseUrl}${restOfUrl}`);
    setResponses((data) => [...data, formatter(response.data)]);
  };

  const clearResponse = () => setResponses([]);

  return [response, addResponseData, clearResponse];
};

const useLocalStorage = (key, initialValue = []) => {
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value), [value, key]);
  }, [value, setValue]);
  return [value, setValue];
};
export default useLocalStorage;
export { useFlip, useAxios, useLocalStorage };
