import React from 'react'

export default function StartScreen({QuestionsNum , dispatch}) {
  return (
    <div className='start'>
        <h3>Welcome To The React Quiz !</h3>
        <h3>{QuestionsNum} Questions to test your react mastry </h3>
        <button className='btn btn-ui' onClick={()=>dispatch({type:"start"})}>Let's Start</button>
    </div>
  )
};
