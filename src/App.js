import './App.css';
import {useEffect, useState} from "react";
import { Formik, Form, Field } from "formik";

function App() {

  const [maze, setMaze] = useState([])

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

  useEffect(() => {
    console.log(typeof maze)
  }, [maze])

  return (
    <div className="App">
      {maze.length !== 0 ?
        <div className="maze-container">
          <ul className="maze">
            {maze.map(x => (
                <li key={maze.indexOf(x)}>
                  {x.map(y => (
                      <p>
                        {y}
                      </p>
                  ))}
                </li>
            ))}
          </ul>
        </div> :
        <Formik initialValues={{
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
