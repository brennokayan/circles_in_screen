import { useState } from 'react'
import reactLogo from './assets/react.svg'
import "./App.css"

interface ClickProps{
  clientX: number;
  clientY: number;
}

function App() {
  const [clickPoints, set_clickPoints] = useState<ClickProps[]>([]);
  const [redoClickPoint, set_redoClickPoint] = useState<ClickProps[]>([])
  
  
  function getCordenate( e : React.MouseEvent<HTMLElement> ){
    const { clientX, clientY } = e;

    set_clickPoints([...clickPoints, {clientX, clientY}]);
    
    

  }
  function handleUndo(){
    const NewClickPoint = [...clickPoints]
    const undoPoint = NewClickPoint.pop();
    if(!undoPoint)return
    set_clickPoints(NewClickPoint);
    set_redoClickPoint([...redoClickPoint, undoPoint])
  }

  function handleRedo(){
    const newClickedPoint = [...redoClickPoint];
    const redoPoint = newClickedPoint.pop();
    if(!redoPoint)return
    set_redoClickPoint(newClickedPoint);
    set_clickPoints([...clickPoints, redoPoint])
  }
  return (
      <>
        <button onClick={handleUndo} disabled={clickPoints.length === 0}>Undo</button>
        <button onClick={handleRedo} disabled={redoClickPoint.length === 0}>Redo</button>
        <div className='App' onClick={getCordenate}>
          {clickPoints.map((e, index) => <div key = {index} className={'divCircle'} style={{left: e.clientX - 10, top: e.clientY - 10}}></div>)}
        </div>
      </>
  )
}

export default App
