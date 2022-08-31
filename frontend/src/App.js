import React from 'react';
import './App.css';
import Card from './Components/Card';
import styled from "styled-components"
import { useState, useEffect } from 'react';

// Styling

const NavbarContainer = styled.nav`
  width: 100%;
  height: 80px;
  background-color: black;
  display: flex;
  flex-direction: column;
  color: white;
`
const OuterGrid = styled.div`

`

const CardGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 5px;
`

const Item = styled.div`
  flex: 1 1 350px;
  padding: 7.5px;
`
// const Column = styled.div`
//   flex: ${(props) => props.size}
// `

function App() {

  // Set State
  const [backendData, setBackendData] = useState();

  useEffect(() => {
    fetch("/api/flashcards").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div className="App">
      <NavbarContainer>
        <h1>Notion Flashcard-er</h1>
      </NavbarContainer>
      <CardGrid>
        {(typeof backendData === 'undefined') ? (
          <div>
            <h1>Cards are loading...</h1>
          </div>
        ) : (

          backendData.map((card) => {
            return (
              <Item>
                <Card className="gridItems" note={card.note} flashcard={card.flashcard} />
              </Item>

            )

          })
        )}
      </CardGrid>
    </div>

  );
}

export default App;
