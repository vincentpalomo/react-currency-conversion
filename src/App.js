import React, { useEffect, useState } from "react";
import "./App.css"
import CurrencyRow from "./CurrencyRow";

const BASE_URL = ' https://v6.exchangerate-api.com/v6/8678674a59547fd1063d3afc/latest/USD'

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount
  if (amountInFromCurrency) {
    fromAmount = amount
    toAmount = amount * exchangeRate
  } else {
    toAmount = amount
    fromAmount = amount / exchangeRate
  }

  useEffect(() =>{
    fetch(BASE_URL)
      .then(res => res.json())
      .then(data => {
        const firstCurrency = Object.keys(data.conversion_rates)[0]
        setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)])
        setFromCurrency(data.base_code)
        setToCurrency(firstCurrency)
        setExchangeRate(data.conversion_rates[firstCurrency])
      })
  }, [])
  return (
    <React.Fragment>
        <h1>Convert</h1>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={e => setFromCurrency(e.target.value)}
          amount={fromAmount}
        />
        <div className="equals">=</div>
        <CurrencyRow 
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={e => setToCurrency(e.target.value)}
          amount={toAmount}
        />
    </React.Fragment>
  );
}

export default App;
