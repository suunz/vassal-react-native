import { apiClient } from '../../../network/ApiClient';
import { Photo } from '../domain/entities/Photo';

export const photosApi = {
  getPhotos: async (): Promise<Photo[]> => {
    return await apiClient.get<Photo[]>('/photos');
  },
  
  getPhotoById: async (id: number): Promise<Photo> => {
    return await apiClient.get<Photo>(`/photos/${id}`);
  },
};