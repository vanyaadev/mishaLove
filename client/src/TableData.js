import React from 'react';
import { useRef, useEffect, useState } from 'react';

export default function TableData({ ticker }) {
  const prevPrice = useRef();
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    let bg = prevPrice.current < ticker.price ? 'green' : 'red';
    setBgColor(bg);

    console.log(`bg td = ${bg}`);
    console.log(`bgColor td = ${bgColor}`);

    prevPrice.current = ticker.price;
  }, [ticker]);

  useEffect(() => {
    prevPrice.current = ticker.price;
    setBgColor('');
  }, []);

  return <td bgColor={bgColor}>{ticker.price}</td>;
}
