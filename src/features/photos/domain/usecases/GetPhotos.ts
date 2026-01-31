import { Photo } from '../entities/Photo';
import { PhotoRepository } from '../repositories/PhotoRepository';

export class GetPhotos {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(): Promise<Photo[]> {
    return await this.photoRepository.getPhotos();
  }
}