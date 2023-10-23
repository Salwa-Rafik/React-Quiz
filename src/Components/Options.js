import React from 'react'

export default function Options({question ,answer ,dispatch}) {
    const hasAnsewred =answer!==null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""}
          ${
            hasAnsewred
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnsewred}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
