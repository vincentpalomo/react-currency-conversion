import React from 'react'

export default function CurrencyRow(props) {
    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        amount
    } = props
  return (
    <div>
        <input type="number" className='input' value={amount} />
        <select value={selectedCurrency} onChange={onChangeCurrency}>
            {currencyOptions.map(options => (
                <option key={options} value={options}>{options}</option>
            ))};
        </select>
    </div>
  )
}
