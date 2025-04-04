import React from 'react';
import styles from '../../pages/AdvocateMatchPage.module.css';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

interface MatchingQuizProps {
  questions: QuizQuestion[];
  currentQuestion: number;
  answers: Record<number, string>;
  onAnswerSelect: (questionId: number, answer: string) => void;
  onNextQuestion: () => void;
  onPrevQuestion: () => void;
}

const MatchingQuiz: React.FC<MatchingQuizProps> = ({
  questions,
  currentQuestion,
  answers,
  onAnswerSelect,
  onNextQuestion,
  onPrevQuestion
}) => {
  const question = questions[currentQuestion];
  const isNextDisabled = !answers[question?.id];
  
  return (
    <div className={styles.matchQuiz}>
      <div className={styles.quizHeader}>
        <h2 className={styles.quizTitle}>Advocate Matching Quiz</h2>
        <p className={styles.quizDescription}>
          Answer a few questions to help us find the best advocate for your specific needs.
        </p>
      </div>
      
      <div className={styles.quizProgress}>
        <div className={styles.progressBar}>
          <div 
            className={styles.progressFill} 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>
      
      <div className={styles.questionContainer}>
        <div className={styles.questionNumber}>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h3 className={styles.questionText}>{question?.question}</h3>
        
        <div className={styles.optionsGrid}>
          {question?.options.map((option, index) => (
            <button
              key={index}
              className={`${styles.optionButton} ${
                answers[question?.id] === option
                  ? styles.optionButtonSelected
                  : ''
              }`}
              onClick={() => onAnswerSelect(question.id, option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      
      <div className={styles.quizNavigation}>
        <button
          className={`${styles.navButton} ${styles.navButtonBack} ${
            currentQuestion === 0 ? styles.navButtonDisabled : ''
          }`}
          onClick={onPrevQuestion}
          disabled={currentQuestion === 0}
        >
          Previous
        </button>
        <button
          className={`${styles.navButton} ${styles.navButtonNext} ${
            isNextDisabled ? styles.navButtonDisabled : ''
          }`}
          onClick={onNextQuestion}
          disabled={isNextDisabled}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default MatchingQuiz;
