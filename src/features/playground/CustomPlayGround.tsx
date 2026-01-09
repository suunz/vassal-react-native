import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
// import { Ionicons } from '@expo/vector-icons'; 
// for play icon

const { width } = Dimensions.get('window');


const recentViewingData = [
  { id: '1', title: 'Wealthy Attwood', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
  { id: '2', title: 'Pokemon Detective', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
  { id: '3', title: 'Paris in Night', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
  { id: '4', title: 'The Gate', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
];

const trailerData = [
  { id: '1', title: 'Trailer 1', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
  { id: '2', title: 'Trailer 2', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
];

const comingThisWeekData = [
  { id: '1', title: 'Thirteen', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
  { id: '2', title: 'Spider Man', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
  { id: '3', title: 'Avengers', image: ('https://cloudfront-us-east-1.images.arcpublishing.com/octane/5MF3TTAC4OZBDQXILQWEKHYYEI.jpg') },
];

const CustomPlayGround = () => {
  const renderRecentItem = ({ item }: any) => (
    <View style={styles.recentItem}>
      <Image
        style={styles.recentImage}
        source={{
          uri: item.image,
        }}
      />
      <Text style={styles.recentTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  const renderTrailerItem = ({ item }: any) => (
    <View style={styles.trailerItem}>
      <Image source={{uri: item.image}} style={styles.trailerImage} />
      <TouchableOpacity style={styles.playButton}>
      </TouchableOpacity>
    </View>
  );

  const renderComingItem = ({ item }: any) => (
    <View style={styles.comingItem}>
      <Image source={{uri: item.image}} style={styles.comingImage} />
      <Text style={styles.comingTitle} numberOfLines={1}>
        {item.title}
      </Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Recent Viewing */}
      <Text style={styles.sectionTitle}>Recent Viewing</Text>
      <FlatList
        data={recentViewingData}
        renderItem={renderRecentItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />

      {/* Trailer */}
      <Text style={styles.sectionTitle}>Trailer</Text>
      <FlatList
        data={trailerData}
        renderItem={renderTrailerItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        bounces={true} // true by default on iOS

      />

      {/* Coming This Week */}
      <Text style={styles.sectionTitle}>Coming This Week</Text>
      <FlatList
        data={comingThisWeekData}
        renderItem={renderComingItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        bounces={true} // true by default on iOS

      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  recentItem: {
    width: 80,
    marginRight: 16,
    alignItems: 'center',
  },
  recentImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 5,
  },
  recentTitle: { fontSize: 12, color: '#333', textAlign: 'center' },

  trailerItem: {
    marginRight: 16,
    position: 'relative',
  },
  trailerImage: { width: width * 0.6, height: 150, borderRadius: 12 },
  playButton: {
    position: 'absolute',
    top: '40%',
    left: '40%',
  },

  comingItem: {
    marginRight: 16,
  },
  comingImage: { width: 120, height: 180, borderRadius: 12 },
  comingTitle: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});

export default CustomPlayGround;
