import { useParams } from 'react-router-dom';
import { URLParams } from '../types/url-params';

export const usePageParams = () => {
  const params = useParams<URLParams>();

  if (
    Object.entries(params).every(([, v]) => v !== undefined)
  ) {
    return params as URLParams;
  }
};
