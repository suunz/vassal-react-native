import React, { useEffect } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  Alert,
  Dimensions,
  Image,
} from 'react-native';
import {
  Card,
  Text,
  ActivityIndicator,
  Snackbar,
  Chip,
  Button,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../store/store';
import { fetchPhotos, clearError } from '../slices/photosSlice';
import { Photo } from '../../domain/entities/Photo';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 48) / 2; // 2 columns with padding

const PhotosScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { photos, loading, error } = useSelector(
    (state: RootState) => state.photos
  );

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]);

  const handleRefresh = () => {
    console.log('pull to refresh called');
    dispatch(fetchPhotos());
  };

  const handlePhotoPress = (photo: Photo) => {
    Alert.alert(
      photo.title,
      `Album ID: ${photo.albumId}\nPhoto ID: ${photo.id}`,
      [
        {
          text: 'View Full Size',
          onPress: () => {
            // Here you could navigate to a full-size photo viewer
            console.log('View full size:', photo.url);
          },
        },
        { text: 'OK' },
      ]
    );
  };

  const renderPhotoItem = ({ item }: { item: Photo }) => (
    <Card
      style={[styles.photoCard, { width: ITEM_WIDTH }]}
      onPress={() => handlePhotoPress(item)}
    >
      <Image
        source={{ uri: item.thumbnailUrl }}
        style={styles.thumbnail}
        resizeMode="cover"
      />
      <Card.Content style={styles.cardContent}>
        <Text variant="bodySmall" numberOfLines={2} style={styles.title}>
          {item.title}
        </Text>
        <View style={styles.chipContainer}>
          <Chip compact mode="outlined" style={styles.chip}>
            Album {item.albumId}
          </Chip>
        </View>
      </Card.Content>
    </Card>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text variant="headlineSmall" style={styles.emptyTitle}>
        {error ? '❌ Failed to Load Photos' : '📸 No Photos Found'}
      </Text>
      <Text variant="bodyMedium" style={styles.emptySubtitle}>
        {error 
          ? 'Check your internet connection and try again'
          : 'Pull down to refresh and load photos'
        }
      </Text>
      {error && (
        <Button 
          mode="contained" 
          onPress={handleRefresh}
          style={styles.retryButton}
        >
          Retry
        </Button>
      )}
    </View>
  );

  if (loading && photos.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
        <Text variant="bodyLarge" style={styles.loadingText}>
          Loading photos...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderPhotoItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={handleRefresh} />
        }
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
      />
      
      <Snackbar
        visible={!!error}
        onDismiss={() => dispatch(clearError())}
        duration={4000}
        action={{
          label: 'Retry',
          onPress: handleRefresh,
        }}
      >
        {error}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  row: {
    justifyContent: 'space-between',
  },
  photoCard: {
    marginBottom: 16,
    elevation: 2,
  },
  thumbnail: {
    width: '100%',
    height: 120,
  },
  cardContent: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  title: {
    marginBottom: 8,
    lineHeight: 16,
  },
  chipContainer: {
    alignItems: 'flex-start',
  },
  chip: {
    height: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 16,
    textAlign: 'center',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    opacity: 0.7,
  },
  retryButton: {
    marginTop: 16,
  },
});

export default PhotosScreen;