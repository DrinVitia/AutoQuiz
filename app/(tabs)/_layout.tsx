import { Tabs } from 'expo-router';
import { Text } from 'react-native';
import { Chrome as Home, BookOpen, Clock, Signpost as SignPost, TrendingUp } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563EB',
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
          paddingBottom: 8,
          height: 80,
        },

      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12, fontWeight: '600' }}>Home</Text>,
          tabBarIcon: ({ size, color }) => (
            <Home size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="practice"
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12, fontWeight: '600' }}>Practice</Text>,
          tabBarIcon: ({ size, color }) => (
            <BookOpen size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exam"
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12, fontWeight: '600' }}>Exam</Text>,
          tabBarIcon: ({ size, color }) => (
            <Clock size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="signs"
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12, fontWeight: '600' }}>Signs</Text>,
          tabBarIcon: ({ size, color }) => (
            <SignPost size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          tabBarLabel: ({ color }) => <Text style={{ color, fontSize: 12, fontWeight: '600' }}>Progress</Text>,
          tabBarIcon: ({ size, color }) => (
            <TrendingUp size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}