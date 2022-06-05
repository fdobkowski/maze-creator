import './styles/App.css';
import {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";
import { mazeElementChange } from "./utils/mazeElementChange";
import { changeCorners } from "./utils/changeCorners";
import {drawSvg} from "./utils/MazeImage/drawSvg";

function App() {

  const [maze, setMaze] = useState([])
  const [config, setConfig] = useState("wall")
  const [border, setBorder] = useState("borderOn")
  const [checked, setChecked] = useState(true)
  const [corners, setCorners] = useState(false)

  const yup = require("yup")

  const schema = yup.object().shape({
    sizeX: yup.number().typeError("Enter a number").integer("Enter an integer").moreThan(1, "Min: 1").lessThan(21, "Max: 20").required("Required"),
    sizeY: yup.number().typeError("Enter a number").integer("Enter an integer").moreThan(1, "Min: 1").lessThan(21, "Max: 20").required("Required")
  })

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
            <select onChange={(event) => setConfig(event.target.value)} defaultValue={"wall"}>
              <option value="path">Path</option>
              <option value="wall">Wall</option>
              <option value="start">Start</option>
              <option value="finish">Finish</option>
            </select>
            <button className={"config_button"} onClick={() => handleClear()}>
              Clear maze
            </button>
            <div>
              <div>
                <button className={"config_button"} onClick={() => setCorners(!corners)}>
                  {!corners ? "Fill corners" : "Reset corners"}
                </button>
              </div>
              <div>
                <input type="checkbox" onChange={() => setChecked(!checked)} defaultChecked={true}/>
                Show grid
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
          <div>
            <button className={"buttons"} onClick={() => handleArray()}>
              Get array
            </button>
            <button className={"buttons"} onClick={() => handleImage()}>
              Download PNG
            </button>
            <button className={"buttons"} onClick={() => setMaze([])}>
              Choose maze size
            </button>
          </div>
        </div> :
        <Formik className="size-setter"
                initialValues={{
                  sizeX: "",
                  sizeY: ""
                  }}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={true}
                validationSchema={schema}
                onSubmit={(values => handleSetter(values))}>
          { ({ errors}) => (
              <Form className={"form"}>
                <div>
                  Choose your maze size
                </div>
                <div>
                  <p className={"fields"}>
                    <Field name="sizeX" placeholder={"Rows"}/>
                    <div className={"error"}>
                      {errors.sizeX ?
                          errors.sizeX : null
                      }</div>
                  </p>
                    <p className={"x"}>x</p>
                  <p className={"fields"}>
                    <Field name="sizeY" placeholder={"Columns"}/>
                    <div className={"error"}>
                      {errors.sizeY ?
                        errors.sizeY : null
                    }</div>
                  </p>
                </div>
                <button className={"buttons"} type="submit">Submit</button>
              </Form>
              )}
        </Formik>
      }
    </div>
  );
}

export default App;
