import React from 'react'

export default function Progress({index ,answer,points,QuestionsNum,maxPoints}) {
  return (
    <header className='progress'>
        <progress max={QuestionsNum} value={index+Number(answer !== null)}/> {/*it will increase only if there is an answer  */}
        <p>Question<strong> {index+1}</strong> / {QuestionsNum}</p>
        <p><strong> {points}</strong> / {maxPoints} Points</p>
    </header>
  )
}
