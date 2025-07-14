import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Clock, FileText, Award, CircleAlert as AlertCircle, Play } from 'lucide-react-native';

export default function ExamScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [examHistory] = useState([
    { id: 1, score: 85, date: '2024-01-15', passed: true },
    { id: 2, score: 78, date: '2024-01-10', passed: true },
    { id: 3, score: 65, date: '2024-01-05', passed: false },
  ]);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const ExamHistoryCard = ({ exam }: any) => (
    <View style={styles.historyCard}>
      <View style={styles.historyHeader}>
        <View style={[
          styles.scoreCircle, 
          { backgroundColor: exam.passed ? '#059669' : '#DC2626' }
        ]}>
          <Text style={styles.scoreText}>{exam.score}%</Text>
        </View>
        <View style={styles.historyContent}>
          <Text style={styles.historyDate}>{exam.date}</Text>
          <Text style={[
            styles.historyStatus,
            { color: exam.passed ? '#059669' : '#DC2626' }
          ]}>
            {exam.passed ? 'Passed' : 'Failed'}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Practice Exam</Text>
            <Text style={styles.subtitle}>Test your knowledge with a full exam simulation</Text>
          </View>

          {/* Exam Info Card */}
          <View style={styles.examInfoCard}>
            <View style={styles.examIconContainer}>
              <FileText size={32} color="#2563EB" />
            </View>
            <View style={styles.examDetails}>
              <Text style={styles.examTitle}>Full Practice Exam</Text>
              <View style={styles.examSpecs}>
                <View style={styles.specItem}>
                  <Clock size={16} color="#6B7280" />
                  <Text style={styles.specText}>45 minutes</Text>
                </View>
                <View style={styles.specItem}>
                  <FileText size={16} color="#6B7280" />
                  <Text style={styles.specText}>40 questions</Text>
                </View>
                <View style={styles.specItem}>
                  <Award size={16} color="#6B7280" />
                  <Text style={styles.specText}>70% to pass</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Start Exam Button */}
          <TouchableOpacity style={styles.startExamButton}>
            <Play size={24} color="white" />
            <Text style={styles.startExamText}>Start Practice Exam</Text>
          </TouchableOpacity>

          {/* Instructions */}
          <View style={styles.instructionsCard}>
            <View style={styles.instructionsHeader}>
              <AlertCircle size={20} color="#F59E0B" />
              <Text style={styles.instructionsTitle}>Exam Instructions</Text>
            </View>
            <View style={styles.instructionsList}>
              <Text style={styles.instructionItem}>• You have 45 minutes to complete 40 questions</Text>
              <Text style={styles.instructionItem}>• You need 70% or higher to pass</Text>
              <Text style={styles.instructionItem}>• You can review your answers before submitting</Text>
              <Text style={styles.instructionItem}>• The exam covers all categories equally</Text>
              <Text style={styles.instructionItem}>• Timer will be visible throughout the exam</Text>
            </View>
          </View>

          {/* Exam History */}
          <View style={styles.historySection}>
            <Text style={styles.sectionTitle}>Recent Exam Results</Text>
            {examHistory.map((exam) => (
              <ExamHistoryCard key={exam.id} exam={exam} />
            ))}
          </View>

          {/* Quick Stats */}
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>3</Text>
              <Text style={styles.statLabel}>Exams Taken</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>85%</Text>
              <Text style={styles.statLabel}>Best Score</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>76%</Text>
              <Text style={styles.statLabel}>Average</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>67%</Text>
              <Text style={styles.statLabel}>Pass Rate</Text>
            </View>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  examInfoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  examIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#EBF8FF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  examDetails: {
    flex: 1,
  },
  examTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 8,
  },
  examSpecs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  specText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
  },
  startExamButton: {
    backgroundColor: '#2563EB',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  startExamText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginLeft: 8,
  },
  instructionsCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  instructionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginLeft: 8,
  },
  instructionsList: {
    marginLeft: 28,
  },
  instructionItem: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 20,
  },
  historySection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  historyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  scoreText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  historyContent: {
    flex: 1,
  },
  historyDate: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginBottom: 2,
  },
  historyStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2563EB',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
});