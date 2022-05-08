import './App.css';
import {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import { mazeElementChange } from "./utils/mazeElementChange";

function App() {

  const [maze, setMaze] = useState([])
  const [config, setConfig] = useState("path")

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
      return x.map(y => {
        return 1
      })
    }))
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
          </div>
          <ul className="maze">
            {maze.map(x => (
                <li key={maze.indexOf(x)}>
                  {x.map((y, ind) => (
                      <p key={(maze.indexOf(x) + 1) * ind} className={`config${y}`}
                         onClick={() => handleFieldChange(maze.indexOf(x), ind)}
                         onDragEnterCapture={() => handleFieldChange(maze.indexOf(x), ind)}>
                        {y}
                      </p>
                  ))}
                </li>
            ))}
          </ul>
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
