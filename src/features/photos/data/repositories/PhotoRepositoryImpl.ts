import { Photo } from '../../domain/entities/Photo';
import { PhotoRepository } from '../../domain/repositories/PhotoRepository';
import { PhotoApiService } from '../datasources/PhotoApiService';
import { mapPhotoModelToEntity } from '../models/PhotoModel';

export class PhotoRepositoryImpl implements PhotoRepository {
  constructor(private photoApiService: PhotoApiService) {}

  async getPhotos(): Promise<Photo[]> {
    const photoModels = await this.photoApiService.getPhotos();
    return photoModels.map(mapPhotoModelToEntity);
  }

  async getPhotoById(id: number): Promise<Photo> {
    const photoModel = await this.photoApiService.getPhotoById(id);
    return mapPhotoModelToEntity(photoModel);
  }
}