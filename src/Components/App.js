import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";

const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore:0,
  secondsRemaining:null,
};



function reducer(state, action) {
  const question = state.questions.at(state.index); //specifying current question
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFaild":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" ,initialState ,
      secondsRemaining: state.questions.length * SECS_PER_QUESTION,};
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption // if the answer is correct increases the points with the quesrion points
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return{
        ...state,
        index:state.index++,
        answer:null,
      }
    case "finish":
        return { ...state, status: "finished" ,
                highscore :state.points>state.highscore ?state.points :state.highscore};
    case "restart":
      return { ...initialState, questions: state.questions, status: "ready" };
    case "tick":
      return{...state ,secondsRemaining :state.secondsRemaining-1,
              status:state.secondsRemaining===0 ?"finished" :state.status}
    default:
      throw new Error("Action is unKnown");
  }
}

function App() {
  const [{ questions, status, index, answer, points ,highscore ,secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const QuestionsNum = questions.length;
  const maxPoints = questions.reduce((prev,cur)=> prev+ cur.points ,
  0); //to calculate sum of questions points

  useEffect(function () {
    fetch(`http://localhost:3000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "error" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen QuestionsNum={QuestionsNum} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
            index={index}
            answer={answer}
            QuestionsNum={QuestionsNum}
            points={points}
            maxPoints={maxPoints}
            />

            <Question
            index={index}
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
            />
            <Footer>
              <Timer 
              dispatch={dispatch}
              secondsRemaining={secondsRemaining}/>
              <NextButton 
              dispatch={dispatch} 
              answer={answer}
              index={index}
              QuestionsNum={QuestionsNum}/>
            </Footer>
           
            
          </>
          
        )}
        {status==="finished" && <FinishScreen 
        points={points} 
        maxPoints={maxPoints}
        highscore={highscore}
        dispatch={dispatch}/>}
        
      </Main>
    </div>
  );
}

export default App;
