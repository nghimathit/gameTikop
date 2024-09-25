// App.js
import React, { useState, useEffect, useContext } from 'react';
import Layout from './Layout';
import { ModalContext } from './context/ModalProvider';
import DoneGame from './DoneGame';

const initialTab = [
  { id: 1, src: "./tikop.jpg", },
  { id: 2, src: "./tikop.jpg", },
  { id: 3, src: "./tikop.jpg", },
  { id: 4, src: "./tikop.jpg", },
  { id: 5, src: "./tikop.jpg", },
  { id: 6, src: "./tikop.jpg", },
  { id: 7, src: "./tikop.jpg", },
  { id: 8, src: "./tikop.jpg", },
  { id: 9, src: "./tikop.jpg", srcIcon: ["./trungthuvang.png", "./trungthuxanh.png", "./trungthuden.png"] }
];

function App() {
  const [start, setstart] = useState(false)
  const [tab, setTab] = useState(initialTab);
  const [time, settime] = useState(10)
  const [point, setpoint] = useState(0);
  const { setisShow, setContent } = useContext(ModalContext);
  let randomNumber = Math.floor(Math.random() * 3);

  // phải học thuật toán shuffleArray hãy vãi chưởng
  let shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  useEffect(() => {
    let Countdown;
    if (time > 0 && start) {
      Countdown = setInterval(() => {
        settime((pre) => pre - 1)
        setTab(shuffleArray([...initialTab]))
      }, 1000)
    }
    else {
      setisShow(true)
      setstart(false)
      settime(10)
      setContent(<DoneGame point={point} />)
    }

    return () => clearInterval(Countdown);
  }, [time, start])

  return (
    <div className='w-full flex justify-center ' onContextMenu={(e) => e.preventDefault()}>
      <div className='w-full sm:w-1/2'>
        <h1 className='text-center text-4xl'>Game</h1>
        <p>Bạn đang có {time} s</p>
        <p>Bạn đang có {point} điểm:</p>
        {start == false && <div div className='flex items-center justify-center'>
          <button className='bg-green-300 rounded-lg px-4 mt-3 mb-3 text-lg hover:bg-green-500' onClick={() => {
            setstart(true)
            setpoint(0)
          }}>Bắt Đầu</button></div>}
        <div className='grid grid-cols-3 gap-3 bg-slate-300  rounded-lg  '>
          {
            tab.map(item => (
              <Layout
                key={item.id}
                start={start}
                tab={item}
                setpoint={setpoint}
                index={randomNumber}
                settime={settime}
              />
            ))
          }
        </div>
      </div>
    </div >
  );
}

export default App;

