import { SearchResult } from '@fashion-search/common/src/domain/search-result';

export interface LensSearchResult extends SearchResult {
  position: number;
  title: string;
  link: string;
  source: string;
  price?: LensSearchResultPrice;
  thumbnail: string;
}

export interface LensSearchResultPrice {
  value: string;
  currency: string;
}
