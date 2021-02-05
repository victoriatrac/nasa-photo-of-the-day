import React, { useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    background: black;
    color: white;
    margin-bottom: 5rem;
  }  
  img {
    width: 100%;
    height: auto;
  }
`

const Width = styled.div`
  width: 80%;
  margin: auto;
`

const StyledInfo = styled.div`
  width: 45%;
  display: inline-flex;
  justify-content: center;
`

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
      </div>
    )
  }

  const Info = (props) => {
    return (
      <div className="info">
        <InfoBar
          media_type={photo.media_type}
          hasAName={false}
          date={photo.date}
        />
        <div className="explanation">
          <p>{props.explanation}</p>
        </div>
      </div>
    )
  }

  const InfoBar = (props) => {
    const hasAName = props.hasAName;
    if (hasAName) {
      return (
        <div>
          <StyledInfo>
            <p>{props.media_type} by {props.copyright}</p>
          </StyledInfo>
          <StyledInfo>
            <p>{props.date}</p>
          </StyledInfo>
        </div>
      )
    } return (
      <div>
        <StyledInfo>
          <p>{props.media_type}, photographer unknown</p>
        </StyledInfo>
        <StyledInfo>
          <p>{props.date}</p>
        </StyledInfo>
      </div>
    )
  }

  return (
    <div className="App">
      <React.Fragment>
        <GlobalStyle />
      </React.Fragment>
    
      <Width>
        <div className="header">
          <h1>NASA's APOD</h1>
        </div>
        <Photo
          key={photo.date}
          url={photo.url}
          title={photo.title}
        />
        <Info
          copyright={photo.copyright}
          explanation={photo.explanation}
        />
      </Width>
    </div>
  );
}

export default App;
