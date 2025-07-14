import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, TriangleAlert as AlertTriangle, Heart, Car, ArrowRight } from 'lucide-react-native';
import { router } from 'expo-router';

const categories = [
  {
    id: 'road-signs',
    title: <Text>Road Signs</Text>,
    subtitle: <Text>Traffic signs and signals</Text>,
    icon: <AlertTriangle size={32} color="white" />,
    color: '#EF4444',
    questionCount: 25,
    completed: 18,
  },
  {
    id: 'traffic-rules',
    title: <Text>Traffic Rules</Text>,
    subtitle: <Text>Laws and regulations</Text>,
    icon: <Car size={32} color="white" />,
    color: '#2563EB',
    questionCount: 30,
    completed: 22,
  },
  {
    id: 'first-aid',
    title: <Text>First Aid</Text>,
    subtitle: <Text>Emergency procedures</Text>,
    icon: <Heart size={32} color="white" />,
    color: '#DC2626',
    questionCount: 15,
    completed: 10,
  },
  {
    id: 'scenarios',
    title: <Text>Scenarios</Text>,
    subtitle: <Text>Real driving situations</Text>,
    icon: <BookOpen size={32} color="white" />,
    color: '#059669',
    questionCount: 20,
    completed: 8,
  },
];

export default function PracticeScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const CategoryCard = ({ category }: any) => {
    const progressPercentage = (category.completed / category.questionCount) * 100;
    
    return (
      <TouchableOpacity 
        style={styles.categoryCard}
        onPress={() => router.push(`/quiz/${category.id}` as any)}
      >
        <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
          {category.icon}
        </View>
        
        <View style={styles.categoryContent}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <ArrowRight size={20} color="#6B7280" />
          </View>
          
          <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
          
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { 
                    width: `${progressPercentage}%`,
                    backgroundColor: category.color 
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {category.completed}/{category.questionCount} completed
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Practice Quizzes</Text>
            <Text style={styles.subtitle}>Choose a category to start practicing</Text>
          </View>

          <View style={styles.overallProgress}>
            <Text style={styles.overallTitle}>Overall Progress</Text>
            <View style={styles.overallStats}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>58</Text>
                <Text style={styles.statLabel}>Completed</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>90</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>64%</Text>
                <Text style={styles.statLabel}>Accuracy</Text>
              </View>
            </View>
          </View>

          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </View>

          <TouchableOpacity 
            style={styles.randomQuizButton}
            onPress={() => router.push('/quiz/all' as any)}
          >
            <Text style={styles.randomQuizText}>Random Mixed Quiz</Text>
            <Text style={styles.randomQuizSubtext}>Questions from all categories</Text>
          </TouchableOpacity>
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
  overallProgress: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  overallTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  overallStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
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
    fontWeight: '500',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  categoriesContainer: {
    marginBottom: 24,
  },
  categoryCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  categoryContent: {
    flex: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  categorySubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  randomQuizButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  randomQuizText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 4,
  },
  randomQuizSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});