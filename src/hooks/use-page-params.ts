import { useParams } from 'react-router-dom';
import { URLParams } from '../types/url-params';

export const usePageParams = () => {
  const params = useParams<URLParams>();

  if (
    params.page !== undefined &&
    params.sortType !== undefined &&
    params.order !== undefined &&
    params.category !== undefined
  ) {
    return params as URLParams;
  }
};
