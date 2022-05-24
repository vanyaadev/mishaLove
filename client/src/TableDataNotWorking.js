import React from 'react';
import { useRef, useEffect, useState } from 'react';

export default function TableDataNotWorking({ ticker }) {
  const prevPrice = useRef();
  const [bgColor, setBgColor] = useState('');

  //нашел ответ к 23 линии
  //https://stackoverflow.com/questions/54069253/the-usestate-set-method-is-not-reflecting-a-change-immediately

  useEffect(() => {
    //это будет выполнено только первый раз,
    //тошо потом в линии 20 мы инициализируем
    if (!prevPrice.current) {
      prevPrice.current = ticker.price;
      setBgColor('');
      return; //сразу возвращаю тошо дальше только для дальнейших рендеров
    }

    //даже занчения ебанутые какие-то
    // console.log(`prevPrice.current = ${prevPrice.current}`);
    // console.log(`ticker.price = ${ticker.price}`);
    //высчитываю цвет
    let bg = prevPrice.current < ticker.price ? 'green' : 'red';
    setBgColor(bg);

    console.log(bg); //принтит цвет
    console.log(bgColor); //принтит undefined ВТФ

    prevPrice.current = ticker.price;
  }); //единственная разница это то что мы юзаем при каждом рендере, а там на тикере

  return <td bgColor={bgColor}>{ticker.price}</td>; //и цвет всегда будет красный
}
