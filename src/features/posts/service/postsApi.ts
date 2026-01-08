import { apiClient } from '../../../network/ApiClient';
import { Post } from '../models/Posts';

export const fetchPosts = () => {
  return apiClient.get<Post[]>('/posts');
};
