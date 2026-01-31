import { apiClient } from '../../../../network/ApiClient';
import { PhotoModel } from '../models/PhotoModel';

export class PhotoApiService {
  async getPhotos(): Promise<PhotoModel[]> {
    return await apiClient.get<PhotoModel[]>('/photos');
  }

  async getPhotoById(id: number): Promise<PhotoModel> {
    return await apiClient.get<PhotoModel>(`/photos/${id}`);
  }
}