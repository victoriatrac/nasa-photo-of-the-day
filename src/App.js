import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';

function App() {
  const [ photo, setPhoto ] = useState([]);
 
  const fetchPhoto = () => {
    axios.get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY")
      .then(response => {
        setPhoto(response.data);
      })
      .catch(err => console.log(err));
  }
  
  useEffect(fetchPhoto, []);

  const Photo = (props) => {
      return (
        <div className="photo">
          <h2>{props.title}</h2>
          <img src={props.url} alt="NASA APOD" />
          <div className="infoBar">
            <p>{props.media_type} by {props.copyright}</p>
          </div>
          <div className="infoBar">
            <p>{props.date}</p>
          </div>
          <div className="explanation">
            <p>{props.explanation}</p>
          </div>
        </div>
      )
    // }
  }

  return (
    <div className="App">
      <div className="shell">
        <div className="header">
          <h1>NASA's APOD</h1>
        </div>
        <Photo
          key={photo.date}
          url={photo.url}
          title={photo.title}
          media_type={photo.media_type}
          copyright={photo.copyright}
          date={photo.date}
          explanation={photo.explanation}
        />
      </div>
    </div>
  );
}

export default App;
