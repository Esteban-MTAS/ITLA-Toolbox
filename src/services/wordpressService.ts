import { request } from './apiClient';
import { PostsSchema } from '../types/api';
export const NEWS = {
  name: 'WordPress News',
  home: 'https://wordpress.org/news/',
  api: 'https://wordpress.org/news/wp-json/wp/v2/posts?per_page=3&_embed&orderby=date&order=desc',
  logo: 'https://s.w.org/style/images/about/WordPress-logotype-wmark.png',
};
export const getPosts = (signal: AbortSignal) =>
  request(NEWS.api, PostsSchema, signal);
