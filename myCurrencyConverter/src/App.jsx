import { useState } from 'react';
import InputBox from './component/InputBox';
import useCurrencyInfo from './hook/useCurrencyInfo';

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd"); // Renamed 'From' to 'from' for consistency
  const [to, setTo] = useState("inr"); // Renamed 'To' to 'to' for consistency
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from); // Fetch currency data based on the 'from' currency

  const options = Object.keys(currencyInfo); // Get available currency options

  const swap = () => {
    // Swap currencies
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount); // Retain the original amount
    setAmount(convertedAmount); // Update amount for the new currency
  };

  const convert = () => {
    // Perform conversion based on the selected currency
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className='w-full h-screen flex flex-wrap justify-center items-center'
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/18148936/pexels-photo-18148936.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load')`
      }}
    >
      <div className='w-full'>
        <div className='w-full max-w-md mx-auto border border-gray-50 rounded-lg p-5 backdrop:backdrop-blur-sm bg-white/30'>
          <form onSubmit={(e) => {
            e.preventDefault();
            convert(); // Call convert on form submit
          }}>
            <div className='w-full mb-1'>
              <InputBox
                label="From" // Corrected prop name from 'lable' to 'label'
                amount={amount}
                currencyOptions={options} // Corrected prop name from 'currencyOption' to 'currencyOptions'
                onCurrencyChange={(currency) => setFrom(currency)} // Update state based on currency selection
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)} // Update amount
              />
            </div>
            <div className='relative w-full h-0.5'>
              <button
                type='button'
                className='absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5'
                onClick={swap} // Call swap function when clicked
              >
                Swap 
              </button>
            </div>
            <div className='w-full mt-1 mb-4'>
              <InputBox
                label="To" // Corrected prop name from 'lable' to 'label'
                amount={convertedAmount}
                currencyOptions={options} // Corrected prop name from 'currencyOption' to 'currencyOptions'
                onCurrencyChange={(currency) => setTo(currency)} // Update state based on currency selection
                selectCurrency={to} // Set selected currency to the 'to' currency
                amountDisable={true} // Disable amount input for converted value
              />
            </div>
            <button 
              type='submit'
              className='w-full bg-blue-600 text-white px-4 py-3 rounded-lg'
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()} 
            </button>
          </form>
        </div> 
      </div>
    </div>
  );
}

export default App;
