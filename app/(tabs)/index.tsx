import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BookOpen, Clock, Award, Target, TrendingUp, Zap, LogOut } from 'lucide-react-native';
import { getUserStats } from '@/utils/storage';
import { getCurrentUser, signOut } from '@/utils/auth';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [userName, setUserName] = useState('');
  const [stats, setStats] = useState({
    totalCorrect: 0,
    currentStreak: 0,
    bestScore: 0,
    totalQuestions: 0
  });
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    loadStats();
    loadUser();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const loadStats = async () => {
    const userStats = await getUserStats();
    setStats(userStats);
  };

  const loadUser = async () => {
    const user = await getCurrentUser();
    if (user) {
      setUserName(user.name);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.replace('/auth/signin');
  };

  const StatCard = ({ icon, title, value, color }: any) => (
    <View style={[styles.statCard, { borderLeftColor: color }]}>
      <View style={styles.statIcon}>
        {icon}
      </View>
      <View style={styles.statContent}>
        <Text style={styles.statValue}>{value}</Text>
        <Text style={styles.statTitle}>{title}</Text>
      </View>
    </View>
  );

  const ActionButton = ({ icon, title, subtitle, onPress, color }: any) => (
    <TouchableOpacity style={[styles.actionButton, { backgroundColor: color }]} onPress={onPress}>
      <View style={styles.actionIcon}>
        {icon}
      </View>
      <View style={styles.actionContent}>
        <Text style={styles.actionTitle}>{title}</Text>
        <Text style={styles.actionSubtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <View style={styles.headerLeft}>
                <Text style={styles.greeting}>Good morning, {userName}! 👋</Text>
                <Text style={styles.subtitle}>Ready to ace your driving exam?</Text>
              </View>
              <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
                <LogOut size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Grid */}
          <View style={styles.statsContainer}>
            <StatCard
              icon={<Target size={24} color="#059669" />}
              title="Correct Answers"
              value={stats.totalCorrect}
              color="#059669"
            />
            <StatCard
              icon={<Zap size={24} color="#D97706" />}
              title="Current Streak"
              value={`${stats.currentStreak} days`}
              color="#D97706"
            />
            <StatCard
              icon={<Award size={24} color="#7C3AED" />}
              title="Best Score"
              value={`${stats.bestScore}%`}
              color="#7C3AED"
            />
            <StatCard
              icon={<TrendingUp size={24} color="#2563EB" />}
              title="Accuracy"
              value={stats.totalQuestions > 0 ? `${Math.round((stats.totalCorrect / stats.totalQuestions) * 100)}%` : '0%'}
              color="#2563EB"
            />
          </View>

          {/* Quick Actions */}
          <View style={styles.actionsContainer}>
            <Text style={styles.sectionTitle}>Quick Start</Text>
            
            <ActionButton
              icon={<BookOpen size={28} color="white" />}
              title="Practice Quiz"
              subtitle="Study by category"
              color="#2563EB"
              onPress={() => router.push('/(tabs)/practice')}
            />
            
            <ActionButton
              icon={<Clock size={28} color="white" />}
              title="Full Exam"
              subtitle="40 questions, timed"
              color="#059669"
              onPress={() => router.push('/(tabs)/exam')}
            />
          </View>

          {/* Daily Challenge */}
          <View style={styles.challengeContainer}>
            <View style={styles.challengeHeader}>
              <Text style={styles.challengeTitle}>Daily Challenge</Text>
              <Text style={styles.challengeBadge}>NEW</Text>
            </View>
            <Text style={styles.challengeText}>
              Complete today's 5-question challenge and maintain your streak!
            </Text>
            <TouchableOpacity 
              style={styles.challengeButton}
              onPress={() => router.push('/quiz/all')}
            >
              <Text style={styles.challengeButtonText}>Start Challenge</Text>
            </TouchableOpacity>
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
    marginBottom: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerLeft: {
    flex: 1,
  },
  signOutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '400',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
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
  actionsContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionButton: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  actionIcon: {
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
    marginBottom: 2,
  },
  actionSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  challengeContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    borderWidth: 2,
    borderColor: '#F59E0B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  challengeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  challengeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  challengeBadge: {
    backgroundColor: '#F59E0B',
    color: 'white',
    fontSize: 10,
    fontWeight: '700',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  challengeText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  challengeButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  challengeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});