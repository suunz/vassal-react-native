import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Photo } from '../../domain/entities/Photo';
import { PhotoApiService } from '../../data/datasources/PhotoApiService';
import { PhotoRepositoryImpl } from '../../data/repositories/PhotoRepositoryImpl';
import { GetPhotos } from '../../domain/usecases/GetPhotos';

interface PhotosState {
  photos: Photo[];
  loading: boolean;
  error: string | null;
  selectedPhoto: Photo | null;
}

const initialState: PhotosState = {
  photos: [],
  loading: false,
  error: null,
  selectedPhoto: null,
};

// Create instances
const photoApiService = new PhotoApiService();
const photoRepository = new PhotoRepositoryImpl(photoApiService);
const getPhotosUseCase = new GetPhotos(photoRepository);

// Async thunks
export const fetchPhotos = createAsyncThunk(
  'photos/fetchPhotos',
  async (_, { rejectWithValue }) => {
    try {
      const photos = await getPhotosUseCase.execute();
      return photos;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch photos');
    }
  }
);

export const fetchPhotoById = createAsyncThunk(
  'photos/fetchPhotoById',
  async (id: number, { rejectWithValue }) => {
    try {
      const photo = await photoRepository.getPhotoById(id);
      return photo;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch photo');
    }
  }
);

const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setSelectedPhoto: (state, action: PayloadAction<Photo | null>) => {
      state.selectedPhoto = action.payload;
    },
    clearPhotos: (state) => {
      state.photos = [];
      state.selectedPhoto = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch photos
      .addCase(fetchPhotos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotos.fulfilled, (state, action) => {
        state.loading = false;
        state.photos = action.payload;
        state.error = null;
      })
      .addCase(fetchPhotos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Fetch photo by ID
      .addCase(fetchPhotoById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPhotoById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPhoto = action.payload;
        state.error = null;
      })
      .addCase(fetchPhotoById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, setSelectedPhoto, clearPhotos } = photosSlice.actions;
export default photosSlice.reducer;