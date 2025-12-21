import { useEffect, useRef } from 'react'
import '../styles/LEDBoard.css'

function LEDBoard({ text = "Transforma tu idea en realidad" }) {
  const textTrackRef = useRef(null)

  useEffect(() => {
    if (textTrackRef.current) {
      textTrackRef.current.innerHTML = `<div class="text">${text}</div><div class="text text--clone">${text}</div>`
    }
  }, [text])

  return (
    <div className="board-container">
      <div className="rivets">
        <div className="rivet"></div>
        <div className="rivet"></div>
        <div className="rivet"></div>
        <div className="rivet"></div>
      </div>
      <div className="board">
        <div className="board__content">
          <div className="text-track" ref={textTrackRef}>
            <div className="text">{text}</div>
            <div className="text text--clone">{text}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LEDBoard
