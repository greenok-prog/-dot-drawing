import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

interface IDraw{
  x:number,
  y:number,
  color:string
}

function App() {
  const [draws, setDraws] = useState<any>([])
  const [popped, setPoped] = useState<IDraw[]>([])
  const [selectedColor, setSelectedColor] = useState<string>('black')
  const colors = ['red', 'blue', 'black', 'yellow']
  const clickHandler = (e:any) => {
      const x = e.clientX
      const y = e.clientY
      setDraws([...draws, {x, y, color:selectedColor}])
  }
  const removeLast = () => {
    const newArray = [...draws]
    const el = newArray.pop()
    setDraws(newArray)
    setPoped([...popped, el])
  }
  const addRemoved = () => {
    const newArray = [...popped]
    const lastElement = newArray.pop()
    setDraws([...draws, lastElement])
    setPoped(newArray)
  }
  const selectColor = (e:any) => {
    setSelectedColor(e.target.name)
  }
  
  return (
  <div>
    <div className="options">
      <div>
        <button disabled={draws.length === 0} onClick={removeLast}>Undo</button>
        <button disabled={popped.length === 0} onClick={addRemoved}>Redo</button>
      </div>
      <div className='colors'>
        {
          colors.map(color => (
            <button key={color} onClick={(e) => selectColor(e)} name={color} className='color' style={{'background': color}}></button>
          ))
        }
      </div>
    </div>
    <div onClick={(e) => clickHandler(e)} className="App">
    {
      draws.map((el:any, index:number) => (
        <span key={index} style={{'left': `${el.x - 5}px`, 'top': `${el.y - 10}px`, 'background':el.color}} className='circle'></span>
      ))
    }
    </div>
  </div>
  );
}

export default App;
