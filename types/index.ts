export type ContentType = 'heading' | 'paragraph' | 'list' | 'image' | 'quote' | 'code' | 'gallery';

export interface ContentBlock {
  type: ContentType;
  value?: string;
  items?: string[];
  src?: string;
  alt?: string;
  language?: string;
  images?: string[];
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string;
  coverImage: string;
  description?: string;
  tags: string[];
  content: ContentBlock[];
  readTime?: number;
}

export interface PaginationParams {
  page: number;
  limit: number;
}
