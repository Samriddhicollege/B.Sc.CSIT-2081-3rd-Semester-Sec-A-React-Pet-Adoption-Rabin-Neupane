import { useState } from 'react';
import { useNotification } from '../hooks/useNotification';
import '../index.css';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How much free time do you have daily?",
    answers: [
      { text: "Less than 1 hour", petTypes: ["cat"] },
      { text: "1-3 hours", petTypes: ["cat", "dog"] },
      { text: "3+ hours", petTypes: ["dog"] }
    ]
  },
  {
    id: 2,
    question: "Do you live in an apartment or house?",
    answers: [
      { text: "Apartment", petTypes: ["cat"] },
      { text: "House with yard", petTypes: ["dog", "cat"] },
      { text: "Farm/Large property", petTypes: ["dog"] }
    ]
  },
  {
    id: 3,
    question: "How active are you?",
    answers: [
      { text: "Prefer indoors", petTypes: ["cat"] },
      { text: "Moderately active", petTypes: ["cat", "dog"] },
      { text: "Very active", petTypes: ["dog"] }
    ]
  },
  {
    id: 4,
    question: "Do you have other pets?",
    answers: [
      { text: "No", petTypes: ["dog", "cat"] },
      { text: "Yes, other dogs", petTypes: ["dog"] },
      { text: "Yes, other cats", petTypes: ["cat"] }
    ]
  },
  {
    id: 5,
    question: "What's your experience with pets?",
    answers: [
      { text: "First time owner", petTypes: ["cat"] },
      { text: "Some experience", petTypes: ["cat", "dog"] },
      { text: "Very experienced", petTypes: ["dog", "cat"] }
    ]
  }
];

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({ dog: 0, cat: 0 });
  const [showResult, setShowResult] = useState(false);
  const { addNotification } = useNotification();

  const handleAnswer = (petTypes) => {
    const newScores = { ...scores };
    petTypes.forEach(type => newScores[type]++);
    setScores(newScores);

    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      addNotification('Quiz completed! Check your results.', 'success');
    }
  };

  const getRecommendation = () => {
    if (scores.dog > scores.cat) {
      return { type: "🐕 Dog", message: "Based on your answers, a Dog might be perfect for you!" };
    } else if (scores.cat > scores.dog) {
      return { type: "🐱 Cat", message: "Based on your answers, a Cat might be perfect for you!" };
    } else {
      return { type: "🐾 Both", message: "You could be great with either a Dog or Cat!" };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScores({ dog: 0, cat: 0 });
    setShowResult(false);
  };

  if (showResult) {
    const recommendation = getRecommendation();
    return (
      <div className="container">
        <div style={{ 
          textAlign: "center", 
          padding: "3rem 2rem",
          maxWidth: "600px",
          margin: "2rem auto",
          backgroundColor: "#f8f9fa",
          borderRadius: "12px",
          border: "2px solid #dee2e6"
        }}>
          <h2 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
            {recommendation.type}
          </h2>
          <p style={{ fontSize: "1.2rem", color: "#495057", marginBottom: "2rem" }}>
            {recommendation.message}
          </p>
          
          <div style={{ marginBottom: "2rem" }}>
            <p style={{ color: "#6c757d" }}>Your Score:</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "2rem", marginTop: "1rem" }}>
              <div>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#007bff" }}>{scores.dog}</p>
                <p>Dog Match</p>
              </div>
              <div>
                <p style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#ff69b4" }}>{scores.cat}</p>
                <p>Cat Match</p>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            <button 
              onClick={resetQuiz}
              style={{
                padding: "10px 20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem"
              }}
            >
              Retake Quiz
            </button>
            <a 
              href="/browse"
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-block"
              }}
            >
              Browse Pets
            </a>
          </div>
        </div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  return (
    <div className="container">
      <div style={{ 
        maxWidth: "600px", 
        margin: "2rem auto",
        padding: "2rem"
      }}>
        <h2>Find Your Perfect Pet Match 🐾</h2>
        
        <div style={{ 
          marginBottom: "2rem",
          backgroundColor: "#e9ecef",
          borderRadius: "8px",
          overflow: "hidden"
        }}>
          <div 
            style={{
              width: `${progress}%`,
              backgroundColor: "#007bff",
              height: "8px",
              transition: "width 0.3s ease"
            }}
          />
        </div>

        <p style={{ color: "#6c757d", marginBottom: "1.5rem" }}>
          Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
        </p>

        <h3 style={{ marginBottom: "2rem", fontSize: "1.3rem" }}>
          {question.question}
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {question.answers.map((answer, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(answer.petTypes)}
              style={{
                padding: "15px",
                backgroundColor: "#f8f9fa",
                border: "2px solid #dee2e6",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                textAlign: "left"
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e9ecef";
                e.target.style.borderColor = "#007bff";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#f8f9fa";
                e.target.style.borderColor = "#dee2e6";
              }}
            >
              {answer.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
