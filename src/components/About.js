import React from 'react'
import { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'


 const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      This is about {a.state.name} ans he's in {a.state.class}
    </div>
  )
}

export default About
