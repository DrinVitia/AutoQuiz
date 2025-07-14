import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react-native';
import { getUserStats, getExamResults } from '@/utils/storage';

interface ExamResult {
  id: string;
  score: number;
  date: string;
  category?: string;
  questionsAnswered: number;
  timeSpent: number;
}

interface WeeklyProgressData {
  day: string;
  score: number;
}

interface CategoryProgressData {
  name: React.JSX.Element;
  progress: number;
  color: string;
}

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [stats, setStats] = useState({
    totalCorrect: 0,
    currentStreak: 0,
    bestScore: 0,
    totalQuestions: 0,
  });
  const [examResults, setExamResults] = useState<ExamResult[]>([]);
  const [weeklyProgress, setWeeklyProgress] = useState<WeeklyProgressData[]>([]);
  const [categoryProgress, setCategoryProgress] = useState<CategoryProgressData[]>([]);

  useEffect(() => {
    loadProgressData();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadProgressData = async () => {
    const userStats = await getUserStats();
    const results = await getExamResults();

    setStats(userStats);
    setExamResults(results);

    // Generate weekly progress from recent results
    const weekData = generateWeeklyProgress(results);
    setWeeklyProgress(weekData);

    // Generate category progress
    const categoryData = generateCategoryProgress(results);
    setCategoryProgress(categoryData);
  };

  const generateWeeklyProgress = (results: ExamResult[]) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const weekData = [];

    const today = new Date();
    for (let i = 0; i < 7; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() - (6 - i)); // Go back 6 days for the first day, 0 for today
      const dayResults = results.filter(
        (result: ExamResult) => {
          const resultDate = new Date(result.date);
          return resultDate.toDateString() === targetDate.toDateString();
        }
      );

      const avgScore =
        dayResults.length > 0
          ? Math.round(
              dayResults.reduce((sum: number, r) => sum + r.score, 0) /
                dayResults.length
            )
          : 0;

      weekData.push({
        day: days[i],
        score: avgScore,
      });
    }

    return weekData;
  };

  const generateCategoryProgress = (
    results: ExamResult[]
  ) => {
    const categories = [
      { name: <Text>Road Signs</Text>, key: 'road-signs', color: '#EF4444' },
      {
        name: <Text>Traffic Rules</Text>,
        key: 'traffic-rules',
        color: '#2563EB',
      },
      { name: <Text>First Aid</Text>, key: 'first-aid', color: '#DC2626' },
      { name: <Text>Scenarios</Text>, key: 'scenarios', color: '#059669' },
    ];

    return categories.map((category) => {
      const categoryResults = results.filter(
        (r: ExamResult) => r.category === category.key
      );
      const avgProgress =
        categoryResults.length > 0
          ? Math.round(
              categoryResults.reduce((sum: number, r) => sum + r.score, 0) /
                categoryResults.length
            )
          : 0;

      return {
        name: category.name,
        progress: avgProgress,
        color: category.color,
      };
    });
  };
  const ProgressChart = () => {
    const maxScore = Math.max(
      ...weeklyProgress.map((d: { score: number }) => d.score),
      1
    );
    const chartHeight = 120;

    return (
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Weekly Performance</Text>
        <View style={styles.chart}>
          {weeklyProgress.map((day, index) => (
            <View key={day.day as string} style={styles.chartBar}>
              <View
                style={[
                  styles.bar,
                  {
                    height: (day.score / maxScore) * chartHeight,
                    backgroundColor:
                      day.score >= 80
                        ? '#059669'
                        : day.score >= 60
                        ? '#F59E0B'
                        : '#EF4444',
                  },
                ]}
              />
              <Text style={styles.chartLabel}>{day.day}</Text>
              <Text style={styles.chartScore}>{day.score}%</Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const CategoryProgress = ({ category }: any) => (
    <View style={styles.categoryProgress}>
      <View style={styles.categoryHeader}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryScore}>{category.progress}%</Text>
      </View>
      <View style={styles.progressBar}>
        <View
          style={[
            styles.progressFill,
            {
              width: `${category.progress}%`,
              backgroundColor: category.color,
            },
          ]}
        />
      </View>
    </View>
  );

  const StatCard = ({ icon, title, value, change, isPositive }: any) => (
    <View style={styles.statCard}>
      <View style={styles.statIcon}>{icon}</View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
        {change && (
          <Text
            style={[
              styles.statChange,
              { color: isPositive ? '#059669' : '#EF4444' },
            ]}
          >
            <Text>
              {isPositive ? '+' : ''}
              {change}%
            </Text>
          </Text>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.title}>Your Progress</Text>
            <Text style={styles.subtitle}>Track your learning journey</Text>
          </View>

          {/* Key Stats */}
          <View style={styles.statsContainer}>
            <StatCard
              icon={<Target size={24} color="#2563EB" />}
              title="Overall Score"
              value={
                stats.totalQuestions > 0
                  ? `${Math.round(
                      (stats.totalCorrect / stats.totalQuestions) * 100
                    )}%`
                  : '0%'
              }
              change={
                examResults.length >= 2
                  ? Math.round(examResults[0]?.score - examResults[1]?.score)
                  : 0
              }
              isPositive={
                examResults.length >= 2
                  ? examResults[0]?.score - examResults[1]?.score >= 0
                  : true
              }
            />
            <StatCard
              icon={<TrendingUp size={24} color="#059669" />}
              title="Improvement"
              value={
                examResults.length >= 2
                  ? `${
                      examResults[0]?.score > examResults[1]?.score ? '+' : ''
                    }${Math.round(
                      examResults[0]?.score - examResults[1]?.score
                    )}%`
                  : '0%'
              }
            />
            <StatCard
              icon={<Calendar size={24} color="#F59E0B" />}
              title="Study Streak"
              value={`${stats.currentStreak} days`}
              change={0}
              isPositive={true}
            />
            <StatCard
              icon={<Award size={24} color="#7C3AED" />}
              title="Best Score"
              value={`${stats.bestScore}%`}
            />
          </View>

          {/* Weekly Chart */}
          <ProgressChart />

          {/* Category Progress */}
          <View style={styles.categoriesSection}>
            <Text style={styles.sectionTitle}>Category Progress</Text>
            {categoryProgress.map((category, index) => (
              <CategoryProgress key={index} category={category} />
            ))}
          </View>

          {/* Achievements */}
          <View style={styles.achievementsSection}>
            <Text style={styles.sectionTitle}>Recent Achievements</Text>

            <View style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>🏆</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Perfect Week</Text>
                <Text style={styles.achievementDescription}>
                  Scored above 80% for 7 days straight
                </Text>
              </View>
            </View>

            <View style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>🎯</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>Sign Master</Text>
                <Text style={styles.achievementDescription}>
                  Completed all road signs category
                </Text>
              </View>
            </View>

            <View style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <Text style={styles.achievementEmoji}>🔥</Text>
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>On Fire</Text>
                <Text style={styles.achievementDescription}>
                  7 day study streak
                </Text>
              </View>
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
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    marginRight: 12,
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 2,
  },
  statTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  statChange: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  chartContainer: {
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
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  chartBar: {
    alignItems: 'center',
    flex: 1,
  },
  bar: {
    width: 24,
    borderRadius: 4,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  chartScore: {
    fontSize: 10,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  categoriesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  categoryProgress: {
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
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
  },
  categoryScore: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563EB',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  achievementsSection: {
    marginBottom: 24,
  },
  achievementCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementIcon: {
    width: 50,
    height: 50,
    backgroundColor: '#FEF3C7',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementEmoji: {
    fontSize: 24,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
});
