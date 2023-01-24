import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Model from './Modal'
function App() {
  const {waiting,loading,index,questions,correct,nextQuestion,checkAnswer} = useGlobalContext()

  if (waiting){
    return <SetupForm/>
  }

  if (loading){
    return <Loading/>
  }
  console.log(questions[0])
    const {question,incorrect_answers,correct_answer} = questions[index]
   
    //const answers = [...incorrect_answers,correct_answer]
    //Logic for jumbling the index of array values 
    let answers = [...incorrect_answers]     //We put in array values without the correct answer
  const tempIndex = Math.floor(Math.random() * 4) //Generate a random number. 4 is used as that is the total number of index length we want
  if (tempIndex === 3) {
    answers.push(correct_answer) //if that random num generated is 3, we push the correct answer at the end
  } else {
    answers.push(answers[tempIndex]) //In other cases, we push an empty array at the random index generated between {0,1,2,3}
    answers[tempIndex] = correct_answer //We fill that empty value that was pushed with the correct answer
  }

  console.log(question,incorrect_answers,correct_answer)
  return (
    <main>
      <Model/>
      <section className="quiz">
        <p className="correct-answers">
          correct answers : {correct} /{index}
        </p>
      
      <article className="container">
        <h2 dangerouslySetInnerHTML={{ __html: question}}/>
        <div className="btn-container">
          {answers.map((answer,index)=>{
           return <button key={index} className="answer-btn" dangerouslySetInnerHTML={{ __html: answer}} 
           onClick={()=>checkAnswer(correct_answer === answer)}> 

           </button>
          })}
        </div>
      </article>
      <button className="next-question" onClick={nextQuestion}>Next Question</button>
      </section>
    </main>
  )
}

export default App
