import {useState} from 'react';

export function useUpgrade(initPrice, increment) {
    const [price, setPrice] = useState(initPrice);
    const [amount, setAmount] = useState(0);

    function buy() {
      setAmount(amount + 1);
      setPrice(Math.ceil(price * increment));
    }

    return {amount, price, buy};
};