import {useCallback, useEffect, useRef, useState} from 'react';
import './App.css';
import Button from './components/button/Button';
import Counter from './components/counter/Counter';
import Upgrade from './components/upgrade/Upgrade';
import { useUpgrade } from './hooks/useUpgrade';

function App() {
  const [balance, setBalance] = useState(0);
  const [increment, setIncrement] = useState(1);
  const {amount: amountPlusOneClick, price: pricePlusOneClick, buy: buyPlusOneClick} = useUpgrade(100, 1.05);
  const {amount: amountPlusOneSec, price: pricePlusOneSec, buy: buyPlusOneSec} = useUpgrade(200, 1.1);
  const {amount: amountDoubleUp, price: priceDoubleUp, buy: buyDoubleUp} = useUpgrade(1000, 2);

  const calculateIncrement = useCallback(() => {
    let increase = (1 + amountPlusOneClick) * Math.pow(2, amountDoubleUp);
    setIncrement(increase);
  }, [amountPlusOneClick, amountDoubleUp]);

  useEffect(() => calculateIncrement(), [calculateIncrement, pricePlusOneClick]);

  const tickIncrement = useRef();

  useEffect(() => {
    tickIncrement.current = () => setBalance(balance + (amountPlusOneSec * Math.pow(2, amountDoubleUp)));
  }, [balance, amountPlusOneSec, amountDoubleUp]);

  useEffect(() => {
    setInterval(() => tickIncrement.current(), 1000);
  }, []);

  return (
    <div className="App">
      <div className="frame">
        <Counter count={balance} />
        <Button onClick={() => setBalance(balance + increment)} />
        <div className="upgrade-menu">
          <Upgrade
            bought={amountPlusOneClick}
            name="+1 Clicks"
            price={pricePlusOneClick}
            onBuy={() => {
              buyPlusOneClick();
              setBalance(balance - pricePlusOneClick);
            }} 
            canAfford={balance >= pricePlusOneClick}
          />
          <Upgrade
            bought={amountPlusOneSec}
            name="+1 Per sec."
            price={pricePlusOneSec}
            onBuy={() => {
              buyPlusOneSec();
              setBalance(balance - pricePlusOneSec);
            }}
            canAfford={balance >= pricePlusOneSec}
          />
          <Upgrade
            bought={amountDoubleUp}
            name="Increment x2"
            price={amountDoubleUp < 5 ? priceDoubleUp : "-"}
            onBuy={() => {
              buyDoubleUp();
              setBalance(balance - priceDoubleUp);
            }}
            canAfford={balance >= priceDoubleUp && amountDoubleUp < 5}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
