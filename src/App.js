import './App.css';
import {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import { mazeElementChange } from "./utils/mazeElementChange";
import { changeCorners } from "./utils/changeCorners";
import {drawSvg} from "./utils/MazeImage/drawSvg";

function App() {

  const [maze, setMaze] = useState([])
  const [config, setConfig] = useState("path")
  const [border, setBorder] = useState("borderOn")
  const [checked, setChecked] = useState(true)
  const [corners, setCorners] = useState(false)

  useEffect(() => {
    switch (checked) {
      case true:
        setBorder("borderOn")
            return
      case false:
        setBorder("borderOff")
            return
    }
  }, [checked])

  useEffect(() => {
    switch (corners) {
      case true:
        setMaze(changeCorners(maze, true))
            return
      case false:
        setMaze(changeCorners(maze, false))
            return
    }
  }, [corners])

  const handleSetter = (values) => {
    const newMaze = []

    for (let i = 0; i < values.sizeX; i++) {

      newMaze.push([])
      for (let j = 0; j < values.sizeY; j++) {
        newMaze[i].push(1)
      }
    }
    setMaze(newMaze)
  }

  const handleFieldChange = (x, y) => {
    switch (config) {
      case "path":
        setMaze(mazeElementChange(maze, x, y, 1))
        break
      case "wall":
        setMaze(mazeElementChange(maze, x, y, 0))
        break
      case "start":
        setMaze(mazeElementChange(maze, x, y, 2))
        break
      case "finish":
        setMaze(mazeElementChange(maze, x, y, 3))
        break
      default:
        break
    }
  }

  const handleClear = () => {
    setMaze(maze.map(x => {
      return x.map(() => {
        return 1
      })
    }))

    setCorners(false)
    window.document.getElementById("cornerCheck").checked = false
  }

  const handleArray = () => {
    const data = JSON.stringify(maze)
    const newWindow = window.open()
    newWindow.document.open()
    newWindow.document.write('<html lang=""><body><pre>' + data + '</pre></body></html>')
    newWindow.document.close()
  }

  const handleImage = () => {
    drawSvg(maze)
  }

  return (
    <div className="App">
      {maze.length !== 0 ?
        <div className="maze-container">
          <div className="maze-config">
            <select onChange={(event) => setConfig(event.target.value)}>
              <option value="path">Path</option>
              <option value="wall">Wall</option>
              <option value="start">Start</option>
              <option value="finish">Finish</option>
            </select>
            <button onClick={() => handleClear()}>
              Clear
            </button>
            <div>
              <div>
                <input type="checkbox" onChange={() => setChecked(!checked)} defaultChecked={true}/>
                Show borders
              </div>
              <div>
                <input type="checkbox" id={"cornerCheck"} onChange={() => setCorners(!corners)} defaultChecked={false}/>
                Fill corners
              </div>
            </div>
          </div>
          <ul className="maze">
            {maze.map(x => (
                <li key={maze.indexOf(x)} className={border}>
                  {x.map((y, ind) => (
                      <p key={(maze.indexOf(x) + 1) * ind} className={`config${y}`}
                         onClick={() => handleFieldChange(maze.indexOf(x), ind)}
                         onDragEnterCapture={() => handleFieldChange(maze.indexOf(x), ind)}
                         onDragStart={(e) => {
                           e.dataTransfer.setDragImage(new Image(), 0, 0)
                         }}
                         draggable={true}>
                        {y}
                      </p>
                  ))}
                </li>
            ))}
          </ul>
          <button onClick={() => handleArray()}>
            Get array
          </button>
          <button onClick={() => handleImage()}>
            Get Image
          </button>
        </div> :
        <Formik className="size-setter" initialValues={{
          sizeX: 0,
          sizeY: 0
        }} enableReinitialize={true} onSubmit={(values => handleSetter(values))}>
          <Form>
            <Field name="sizeY"/>
            <p>x</p>
            <Field name="sizeX"/>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      }
    </div>
  );
}

export default App;
