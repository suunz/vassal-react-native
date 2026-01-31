import { Photo } from '../entities/Photo';

export interface PhotoRepository {
  getPhotos(): Promise<Photo[]>;
  getPhotoById(id: number): Promise<Photo>;
}