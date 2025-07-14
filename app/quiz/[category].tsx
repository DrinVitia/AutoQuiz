import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle, Circle as XCircle, RotateCcw } from 'lucide-react-native';
import { getRandomQuestions, Question } from '@/utils/questions';
import { updateUserStats, saveExamResult, getUserStats, updateDailyStreak } from '@/utils/storage';
import QuizCard from '@/components/QuizCard';

export default function QuizScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadQuestions();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [category]);

  const loadQuestions = () => {
    const categoryQuestions = getRandomQuestions(10, category === 'all' ? undefined : category);
    setQuestions(categoryQuestions);
    setSelectedAnswers(new Array(categoryQuestions.length).fill(-1));
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (selectedAnswers[currentQuestionIndex] === -1) {
      Alert.alert('Please select an answer', 'Choose an option before proceeding.');
      return;
    }

    setShowResult(true);
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setShowResult(false);
      } else {
        completeQuiz();
      }
    }, 2000);
  };

  const completeQuiz = async () => {
    const correctAnswers = questions.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correctAnswer ? 1 : 0);
    }, 0);

    const finalScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(finalScore);
    setQuizCompleted(true);

    // Update user stats
    const currentStats = await getUserStats();
    await updateUserStats({
      totalCorrect: currentStats.totalCorrect + correctAnswers,
      totalQuestions: currentStats.totalQuestions + questions.length,
      bestScore: Math.max(currentStats.bestScore, finalScore),
    });

    await saveExamResult({
      id: Date.now().toString(),
      score: finalScore,
      date: new Date().toISOString(),
      category: category || 'mixed',
      questionsAnswered: questions.length,
      timeSpent: 0,
    });

    // Update daily streak
    await updateDailyStreak();
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers(new Array(questions.length).fill(-1));
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
    loadQuestions();
  };

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'road-signs': return 'Road Signs';
      case 'traffic-rules': return 'Traffic Rules';
      case 'first-aid': return 'First Aid';
      case 'scenarios': return 'Scenarios';
      default: return 'Mixed Quiz';
    }
  };

  if (questions.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading questions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (quizCompleted) {
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.resultContainer}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreText}>{score}%</Text>
            </View>
            
            <Text style={styles.resultTitle}>
              {score >= 70 ? 'Great Job!' : 'Keep Practicing!'}
            </Text>
            
            <Text style={styles.resultSubtitle}>
              You got {questions.reduce((count, question, index) => 
                count + (selectedAnswers[index] === question.correctAnswer ? 1 : 0), 0
              )} out of {questions.length} questions correct
            </Text>

            <View style={styles.resultActions}>
              <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                <RotateCcw size={20} color="white" />
                <Text style={styles.restartButtonText}>Try Again</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.homeButton} onPress={() => router.back()}>
                <Text style={styles.homeButtonText}>Back to Practice</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isCorrect = selectedAnswers[currentQuestionIndex] === currentQuestion.correctAnswer;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#2563EB" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.categoryTitle}>{getCategoryTitle(category || 'all')}</Text>
            <Text style={styles.progressText}>
              Question {currentQuestionIndex + 1} of {questions.length}
            </Text>
          </View>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }
            ]} 
          />
        </View>

        {/* Question Card */}
        <QuizCard
          question={currentQuestion}
          selectedAnswer={selectedAnswers[currentQuestionIndex]}
          onAnswerSelect={handleAnswerSelect}
          showResult={showResult}
          disabled={showResult}
        />

        {/* Result Feedback */}
        {showResult && (
          <View style={[styles.feedback, isCorrect ? styles.correctFeedback : styles.incorrectFeedback]}>
            <View style={styles.feedbackIcon}>
              {isCorrect ? (
                <CheckCircle size={24} color="#059669" />
              ) : (
                <XCircle size={24} color="#DC2626" />
              )}
            </View>
            <Text style={[styles.feedbackText, isCorrect ? styles.correctText : styles.incorrectText]}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Text>
          </View>
        )}

        {/* Next Button */}
        {!showResult && (
          <TouchableOpacity 
            style={[
              styles.nextButton, 
              selectedAnswers[currentQuestionIndex] === -1 && styles.nextButtonDisabled
            ]} 
            onPress={handleNext}
            disabled={selectedAnswers[currentQuestionIndex] === -1}
          >
            <Text style={styles.nextButtonText}>
              {currentQuestionIndex === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </Text>
          </TouchableOpacity>
        )}
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#6B7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerContent: {
    flex: 1,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  progressText: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 24,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2563EB',
    borderRadius: 2,
  },
  feedback: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
  },
  correctFeedback: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#059669',
  },
  incorrectFeedback: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  feedbackIcon: {
    marginRight: 8,
  },
  feedbackText: {
    fontSize: 16,
    fontWeight: '600',
  },
  correctText: {
    color: '#059669',
  },
  incorrectText: {
    color: '#DC2626',
  },
  nextButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  nextButtonDisabled: {
    backgroundColor: '#9CA3AF',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 32,
    fontWeight: '700',
    color: 'white',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
  },
  resultActions: {
    width: '100%',
  },
  restartButton: {
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  restartButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  homeButton: {
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  homeButtonText: {
    color: '#2563EB',
    fontSize: 16,
    fontWeight: '600',
  },
});