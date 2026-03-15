import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizProps {
  questions: Question[];
  title: string;
  colorTheme: 'pink' | 'cyan' | 'green';
}

export default function Quiz({ questions, title, colorTheme }: QuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (showResult) return;
    setSelectedAnswer(index);
    setShowResult(true);
    if (index === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
  };

  const themeColors = {
    pink: { bg: 'bg-pink-100', border: 'border-pink-400', text: 'text-pink-600', btn: 'bg-pink-500 hover:bg-pink-600' },
    cyan: { bg: 'bg-cyan-100', border: 'border-cyan-400', text: 'text-cyan-600', btn: 'bg-cyan-500 hover:bg-cyan-600' },
    green: { bg: 'bg-green-100', border: 'border-green-400', text: 'text-green-600', btn: 'bg-green-500 hover:bg-green-600' },
  };

  const colors = themeColors[colorTheme];

  if (isFinished) {
    return (
      <div className={`p-8 rounded-3xl shadow-xl border-4 ${colors.border} ${colors.bg} text-center max-w-2xl mx-auto`}>
        <h2 className={`text-3xl font-bold mb-4 ${colors.text}`}>¡Resultados de {title}!</h2>
        <p className="text-xl mb-6">Obtuviste {score} de {questions.length} respuestas correctas.</p>
        <div className="flex justify-center mb-8">
          <div className="text-6xl">
            {score / questions.length > 0.8 ? '🌟' : score / questions.length > 0.5 ? '👍' : '💪'}
          </div>
        </div>
        <button 
          onClick={handleRestart}
          className={`px-6 py-3 rounded-full text-white font-bold transition-colors ${colors.btn}`}
        >
          Volver a intentar
        </button>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <h2 className={`text-2xl font-bold ${colors.text}`}>{title}</h2>
        <span className="font-medium text-gray-500">Pregunta {currentIndex + 1} de {questions.length}</span>
      </div>

      <motion.div 
        key={currentIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className={`bg-white p-6 md:p-8 rounded-3xl shadow-lg border-2 ${colors.border}`}
      >
        <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
          {currentQ.question}
        </h3>

        <div className="space-y-4">
          {currentQ.options.map((opt, idx) => {
            let btnClass = "bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100";
            let icon = null;

            if (showResult) {
              if (idx === currentQ.correctAnswer) {
                btnClass = "bg-green-100 border-green-500 text-green-800";
                icon = <CheckCircle2 className="text-green-500" size={20} />;
              } else if (idx === selectedAnswer) {
                btnClass = "bg-red-100 border-red-500 text-red-800";
                icon = <XCircle className="text-red-500" size={20} />;
              } else {
                btnClass = "bg-gray-50 border-gray-200 text-gray-400 opacity-50";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${btnClass} ${!showResult && selectedAnswer === idx ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}
              >
                <span className="flex-1">{opt}</span>
                {icon && <span className="ml-4">{icon}</span>}
              </button>
            );
          })}
        </div>

        {showResult && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex justify-end"
          >
            <button
              onClick={handleNext}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-white font-bold transition-colors ${colors.btn}`}
            >
              {currentIndex < questions.length - 1 ? 'Siguiente' : 'Ver Resultados'}
              <ArrowRight size={20} />
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
