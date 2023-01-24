import axios from 'axios'
import React, { useState, useContext } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [waiting,setWaiting] = useState(true) //we are using this as initially, we are dynamically constructing the API to fetch with user requested params
  const [loading,setLoading] = useState(false)
  const [index,setIndex] = useState(0)
  const [questions,setQuestions] = useState([])
  const [correct,setCorrect] = useState(0)
  const [error,setError] = useState(false)
  const [isModelOpen,setIsModelOpen] = useState(false)
  const [quiz,setQuiz] = useState({
    amount:10,
    category:"sports",
    difficulty: "easy",
  })
  const fetchQuestions = async (url) => {
    setLoading(true)
    setWaiting(false)
    const response = await axios(url).catch((err)=>{
      console.log(err)
    })
    if(response){
      const data = response.data.results
      if (data.length>0){
        setQuestions(data)
        setWaiting(false)
        setLoading(false)
        setError(false)
      } else{
        setWaiting(true)
        setError(true)
      }
      
    } else {
      setWaiting(true)
    }

  }

  const nextQuestion = () => {
    setIndex ((oldIndex)=>{
      const index = oldIndex +1
      if (index > questions.length -1){
        openModel()
        return 0
      }
      return index
    })
  }

    const checkAnswer = (value) => {
    if (value) {
      setCorrect((oldState) => oldState + 1)
    }
    nextQuestion()
  }

  const openModel = () => {
    setIsModelOpen(true)
  }

  const closeModel = () => {
    setWaiting(true)
    setCorrect(0)
    setIsModelOpen(false)
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    setQuiz({...quiz,[name]:value})
    console.log(name,value)
  }

 const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, category, difficulty } = quiz

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`
    fetchQuestions(url)
  }

  return <AppContext.Provider value={{
    waiting,
    loading,
    index,
    questions,
    correct,
    error,
    isModelOpen,
    quiz,
    nextQuestion,
    checkAnswer,
    closeModel,
    handleChange,
    handleSubmit,
  }}>{children}</AppContext.Provider>
}

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
