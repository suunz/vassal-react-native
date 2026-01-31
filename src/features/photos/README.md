# Photos Feature

This feature demonstrates a complete implementation of fetching and displaying photos from the JSONPlaceholder API using Redux for state management and clean architecture principles.

## Architecture

The photos feature follows clean architecture with the following layers:

### Domain Layer
- **entities/Photo.ts**: Core business entity representing a photo
- **repositories/PhotoRepository.ts**: Abstract repository interface
- **usecases/GetPhotos.ts**: Business logic for fetching photos

### Data Layer
- **models/PhotoModel.ts**: Data transfer objects and mapping functions
- **datasources/PhotoApiService.ts**: API service for making HTTP requests
- **repositories/PhotoRepositoryImpl.ts**: Concrete implementation of PhotoRepository

### Presentation Layer
- **screens/PhotosScreen.tsx**: React Native screen component
- **slices/photosSlice.ts**: Redux Toolkit slice for state management

## Features

- ✅ Fetch photos from JSONPlaceholder API
- ✅ Display photos in a responsive grid layout
- ✅ Pull-to-refresh functionality
- ✅ Loading states and error handling
- ✅ Photo details on tap
- ✅ Redux state management with async thunks
- ✅ Clean architecture pattern
- ✅ TypeScript support
- ✅ Industry-standard API client with interceptors and retry logic

## API Endpoint

The feature uses the JSONPlaceholder photos endpoint:
```
GET https://jsonplaceholder.typicode.com/photos
```

Response format:
```json
[
  {
    "albumId": 1,
    "id": 1,
    "title": "accusamus beatae ad facilis cum similique qui sunt",
    "url": "https://via.placeholder.com/600/92c952",
    "thumbnailUrl": "https://via.placeholder.com/150/92c952"
  }
]
```

## Usage

The PhotosScreen is integrated into the main navigation stack and can be accessed from the HomeScreen. The Redux store automatically manages the photos state, including loading, error, and data states.

## State Management

The photos slice includes:
- `fetchPhotos`: Async thunk for fetching all photos
- `fetchPhotoById`: Async thunk for fetching a single photo
- `clearError`: Action to clear error state
- `setSelectedPhoto`: Action to set selected photo
- `clearPhotos`: Action to clear all photos data

## Error Handling

The feature includes comprehensive error handling:
- Network timeouts
- API errors
- Retry functionality
- User-friendly error messages
- Fallback UI states