import { UserPreferences } from '../preferences/user-preferences';

export interface GetSearchResultsByUrlRequest {
  url: string;
  preferences?: UserPreferences;
}
