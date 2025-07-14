import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  Search,
  Filter,
  TriangleAlert as AlertTriangle,
  Shield,
  Info,
} from 'lucide-react-native';

const signCategories = [
  { id: 'all', title: <Text>All Signs</Text>, color: '#6B7280' },
  { id: 'warning', title: <Text>Warning</Text>, color: '#F59E0B' },
  { id: 'regulatory', title: <Text>Regulatory</Text>, color: '#DC2626' },
  { id: 'informational', title: <Text>Informational</Text>, color: '#2563EB' },
];

const trafficSigns = [
  {
    id: 1,
    name: <Text>Stop Sign</Text>,
    category: 'regulatory',
    description: <Text>Come to a complete stop at the intersection</Text>,
    emoji: '🛑',
    details: (
      <Text>Must stop completely before the stop line or crosswalk</Text>
    ),
  },
  {
    id: 2,
    name: <Text>Yield Sign</Text>,
    category: 'regulatory',
    description: <Text>Give right of way to other traffic</Text>,
    emoji: '🔺',
    details: (
      <Text>
        Slow down and give right of way to pedestrians and cross traffic
      </Text>
    ),
  },
  {
    id: 3,
    name: <Text>Speed Limit</Text>,
    category: 'regulatory',
    description: <Text>Maximum speed allowed</Text>,
    emoji: '⚡',
    details: <Text>Shows the maximum legal speed on this road</Text>,
  },
  {
    id: 4,
    name: <Text>Pedestrian Crossing</Text>,
    category: 'warning',
    description: <Text>Watch for pedestrians crossing</Text>,
    emoji: '🚶',
    details: <Text>Reduce speed and watch for people crossing the road</Text>,
  },
  {
    id: 5,
    name: <Text>School Zone</Text>,
    category: 'warning',
    description: <Text>Reduced speed in school area</Text>,
    emoji: '🏫',
    details: <Text>Special speed limits during school hours</Text>,
  },
  {
    id: 6,
    name: <Text>Hospital</Text>,
    category: 'informational',
    description: <Text>Hospital or medical facility</Text>,
    emoji: '🏥',
    details: <Text>Indicates location of hospital or medical services</Text>,
  },
  {
    id: 7,
    name: <Text>Parking</Text>,
    category: 'informational',
    description: <Text>Parking area available</Text>,
    emoji: '🅿️',
    details: <Text>Designated parking area ahead</Text>,
  },
  {
    id: 8,
    name: <Text>No Entry</Text>,
    category: 'regulatory',
    description: <Text>Do not enter this area</Text>,
    emoji: '⛔',
    details: <Text>Entry prohibited for all vehicles</Text>,
  },
];

export default function SignsScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredSigns, setFilteredSigns] = useState(trafficSigns);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    filterSigns();
  }, [searchText, selectedCategory]);

  const filterSigns = () => {
    let filtered = trafficSigns;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((sign) => sign.category === selectedCategory);
    }

    if (searchText) {
      filtered = filtered.filter(
        (sign) =>
          (
            typeof sign.name === 'string'
              ? sign.name
              : typeof sign.name.props.children === 'string'
              ? sign.name.props.children
              : ''
          ).toLowerCase().includes(searchText.toLowerCase()) ||
          (
            typeof sign.description === 'string'
              ? sign.description
              : typeof sign.description.props.children === 'string'
              ? sign.description.props.children
              : ''
          ).toLowerCase().includes(searchText.toLowerCase())
      );
    }

    setFilteredSigns(filtered);
  };

  const CategoryButton = ({ category }: any) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === category.id && { backgroundColor: category.color },
      ]}
      onPress={() => setSelectedCategory(category.id)}
    >
      <Text
        style={[
          styles.categoryButtonText,
          selectedCategory === category.id && { color: 'white' },
        ]}
      >
        {category.title}
      </Text>
    </TouchableOpacity>
  );

  const SignCard = ({ item }: any) => {
    const getCategoryIcon = (category: string) => {
      switch (category) {
        case 'warning':
          return <AlertTriangle size={16} color="#F59E0B" />;
        case 'regulatory':
          return <Shield size={16} color="#DC2626" />;
        case 'informational':
          return <Info size={16} color="#2563EB" />;
        default:
          return <Info size={16} color="#6B7280" />;
      }
    };

    const getCategoryColor = (category: string) => {
      switch (category) {
        case 'warning':
          return '#FEF3C7';
        case 'regulatory':
          return '#FEE2E2';
        case 'informational':
          return '#DBEAFE';
        default:
          return '#F3F4F6';
      }
    };

    return (
      <TouchableOpacity style={styles.signCard}>
        <View style={styles.signEmoji}>
          <Text style={styles.emojiText}>{item.emoji}</Text>
        </View>

        <View style={styles.signContent}>
          <View style={styles.signHeader}>
            <Text style={styles.signName}>{item.name}</Text>
            <View
              style={[
                styles.categoryBadge,
                { backgroundColor: getCategoryColor(item.category) },
              ]}
            >
              {getCategoryIcon(item.category)}
            </View>
          </View>

          <Text style={styles.signDescription}>{item.description}</Text>
          <Text style={styles.signDetails}>{item.details}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Traffic Signs</Text>
          <Text style={styles.subtitle}>Learn and recognize traffic signs</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search signs..."
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesScroll}
        >
          {signCategories.map((category) => (
            <CategoryButton key={category.id} category={category} />
          ))}
        </ScrollView>

        {/* Signs List */}
        <FlatList
          data={filteredSigns}
          renderItem={SignCard}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.signsList}
        />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  categoriesScroll: {
    marginBottom: 20,
  },
  categoryButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  signsList: {
    paddingBottom: 20,
  },
  signCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  signEmoji: {
    width: 60,
    height: 60,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  emojiText: {
    fontSize: 28,
  },
  signContent: {
    flex: 1,
  },
  signHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  signName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
  },
  categoryBadge: {
    borderRadius: 12,
    padding: 6,
    marginLeft: 8,
  },
  signDescription: {
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 4,
  },
  signDetails: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
});
