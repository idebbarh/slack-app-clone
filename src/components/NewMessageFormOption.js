import React from 'react'
import styled from 'styled-components'

function NewMessageFormOption({Icon}) {
  return (
    <FormOptionContainer>
        <Icon/>
    </FormOptionContainer>
  )
}

export default NewMessageFormOption


const FormOptionContainer = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 4px;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    :hover{
        background-color:#ECE7EC;
    }
`