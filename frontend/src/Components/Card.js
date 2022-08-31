import React, { useState } from "react";
import styled from "styled-components"
import ReactCardFlip from 'react-card-flip';

// Styling
const StyledCard = styled.div`
    border: 2px solid black;
    flex: 1 1 500px;
    padding: 3px;
`

const Button = styled.button`
    background-color: black;
    color: white;
`


function Card(props) {

    const [isFlipped, setIsFlipped] = useState(false)

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <React.Fragment>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                <StyledCard>
                    <p>{props.note}</p>
                    <Button onClick={handleClick}>Check</Button>
                </StyledCard >
                <StyledCard >
                    <p>{props.flashcard}</p>
                    <Button onClick={handleClick}>Flip back
                    </Button>
                </StyledCard >
            </ReactCardFlip>
        </React.Fragment>
    )

}

export default Card;