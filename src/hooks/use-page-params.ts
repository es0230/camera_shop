import { useParams } from 'react-router-dom';
import { INITIAL_CATALOG_PAGE_URL_PARAMS } from '../const';
import { URLParams } from '../types/url-params';

export const usePageParams = () => {
  const params = useParams<URLParams>();

  if (
    Object.entries(params).every(([, v]) => v !== undefined)
  ) {
    return params;
  }

  return INITIAL_CATALOG_PAGE_URL_PARAMS;
};
