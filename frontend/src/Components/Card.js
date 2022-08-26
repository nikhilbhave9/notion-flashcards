import React from "react";
import styled from "styled-components"

// Styling
const StyledCard = styled.div`
    border: 2px solid black;
`


function Card (props) {
    return (
        <div>
            <StyledCard>
                <h1>Flashcard #{props.num}</h1>
            </StyledCard>       
        </div>        
    )
    
}

export default Card;