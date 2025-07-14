import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Question } from '@/utils/questions';

interface QuizCardProps {
  question: Question;
  selectedAnswer?: number;
  onAnswerSelect: (answerIndex: number) => void;
  showResult?: boolean;
  disabled?: boolean;
}

export default function QuizCard({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  showResult = false,
  disabled = false 
}: QuizCardProps) {
  
  const getOptionStyle = (index: number) => {
    let dynamicStyles = [];
    
    if (disabled || !showResult) {
      if (selectedAnswer === index) {
        dynamicStyles.push(styles.selectedOption);
      }
    } else if (showResult) {
      if (index === question.correctAnswer) {
        dynamicStyles.push(styles.correctOption);
      } else if (selectedAnswer === index && index !== question.correctAnswer) {
        dynamicStyles.push(styles.incorrectOption);
      }
    }
    
    return [styles.option, ...dynamicStyles];
  };

  const getOptionTextStyle = (index: number) => {
    let dynamicTextStyles = [];
    
    if (selectedAnswer === index && !showResult) {
      dynamicTextStyles.push(styles.selectedOptionText);
    } else if (showResult) {
      if (index === question.correctAnswer) {
        dynamicTextStyles.push(styles.correctOptionText);
      } else if (selectedAnswer === index && index !== question.correctAnswer) {
        dynamicTextStyles.push(styles.incorrectOptionText);
      }
    }
    
    return [styles.optionText, ...dynamicTextStyles];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      
      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={getOptionStyle(index)}
            onPress={() => !disabled && onAnswerSelect(index)}
            disabled={disabled}
          >
            <View style={styles.optionContent}>
              <View style={styles.optionLetter}>
                <Text style={[styles.optionLetterText, getOptionTextStyle(index)]}>
                  {String.fromCharCode(65 + index)}
                </Text>
              </View>
              <Text style={getOptionTextStyle(index)}>{option}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
      
      {showResult && (
        <View style={styles.explanationContainer}>
          <Text style={styles.explanationTitle}>Explanation:</Text>
          <Text style={styles.explanationText}>{question.explanation}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 20,
    lineHeight: 24,
  },
  optionsContainer: {
    marginBottom: 16,
  },
  option: {
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  selectedOption: {
    borderColor: '#2563EB',
    backgroundColor: '#EBF8FF',
  },
  correctOption: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
  },
  incorrectOption: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionLetterText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  optionText: {
    fontSize: 16,
    color: '#374151',
    flex: 1,
    fontWeight: '500',
  },
  selectedOptionText: {
    color: '#2563EB',
  },
  correctOptionText: {
    color: '#059669',
  },
  incorrectOptionText: {
    color: '#DC2626',
  },
  explanationContainer: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
  },
  explanationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  explanationText: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
});