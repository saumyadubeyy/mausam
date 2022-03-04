import React from 'react'
import "../css/Footer.css"
import GitHub from "../assets/github.png"
import LinkedIn from "../assets/linkedin.png"

const Footer = () => {
  return (
    <div className='footer'>
        <div>Made by Saumya Dubey</div>

            <a href='https://github.com/saumyadubeyy/mausam' target="_blank" rel="noreferrer"><img src={GitHub} alt=" " /></a>
            <a href='https://www.linkedin.com/in/saumya-dubey-1a3002184/' target="_blank" rel="noreferrer"><img src={LinkedIn} alt=" " /></a>
        
    </div>
  )
}

export default Footer