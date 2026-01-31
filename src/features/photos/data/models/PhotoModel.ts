import { Photo } from '../../domain/entities/Photo';

export interface PhotoModel {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

export const mapPhotoModelToEntity = (model: PhotoModel): Photo => ({
  albumId: model.albumId,
  id: model.id,
  title: model.title,
  url: model.url,
  thumbnailUrl: model.thumbnailUrl,
});