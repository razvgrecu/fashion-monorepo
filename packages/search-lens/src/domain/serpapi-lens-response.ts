import { LensSearchMetadata } from './lens-search-metadata';
import { LensSearchResult } from './lens-search-result';

export interface SerpApiLensResponse {
  metadata?: LensSearchMetadata;
  results: LensSearchResult[];
  error?: string;
}
