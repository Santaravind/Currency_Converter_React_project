import { useState,useEffect } from "react";

function useCurrencyInfo(currency){
    const [data,setData]=useState({})
    useEffect(()=>{
        
      fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
      .then((res) => res.json())
      .then((res) => setData(res[currency])) // Set data for the specific currency
      .catch((err) => console.error(err)); // Log errors if fetch fails
}, [currency]);
  return data;
}
export default useCurrencyInfo;