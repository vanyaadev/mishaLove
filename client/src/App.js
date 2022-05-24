import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import TableData from './TableData';
import TableDataNotWorking from './TableDataNotWorking';

function App() {
  const [tickers, setTickers] = useState([]);
  const prevTickers = useRef([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('localhost:4000');
    socket.current.emit('start');
    socket.current.on('ticker', (tickersData) => {
      setTickers(tickersData);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!tickers.length) return;
    prevTickers.current = tickers;
  }, [tickers]);

  function bgColorPrice(currentTicker) {
    const foundPrevTicker = prevTickers.current.find((item) => {
      return item.ticker == currentTicker.ticker;
    });
    if (!foundPrevTicker) return;

    return foundPrevTicker.price < currentTicker.price ? 'green' : 'red';
  }

  function parseDate(dateString) {
    const d = new Date(dateString);

    //can use any library, decided not to complicate
    return (
      ('0' + d.getDate()).slice(-2) +
      '-' +
      ('0' + (d.getMonth() + 1)).slice(-2) +
      '-' +
      d.getFullYear() +
      ' ' +
      ('0' + d.getHours()).slice(-2) +
      ':' +
      ('0' + d.getMinutes()).slice(-2)
    );
  }

  return (
    <table>
      <tr>
        <th>Ticker</th>
        <th>Exchange</th>
        <th>Price</th>
        <th>Change</th>
        <th>Change %</th>
        <th>Dividend</th>
        <th>Yield</th>
        <th>Last trade time</th>
        <th>Prcie2</th>
        <th>Prcie2NotWorking</th>
      </tr>
      {tickers.map((ticker) => {
        return (
          <tr>
            <td>{ticker.ticker}</td>
            <td>{ticker.exchange}</td>
            <td bgColor={bgColorPrice(ticker)}>{ticker.price}</td>
            <td>{ticker.change}</td>
            <td>{ticker.change_percent}</td>
            <td>{ticker.dividend}</td>
            <td>{ticker.yield}</td>
            <td>{parseDate(ticker.last_trade_time)}</td>
            <TableData ticker={ticker}></TableData>
            <TableDataNotWorking ticker={ticker}></TableDataNotWorking>
          </tr>
        );
      })}
    </table>
  );
}

export default App;
