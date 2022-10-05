import { useNavigate, useParams } from 'react-router-dom';
import { AppRoute } from '../const';

export const usePageNumber = () => {
  const { page } = useParams();
  const navigate = useNavigate();

  if (typeof Number(page) === 'number') {
    return Number(page);
  }

  navigate(AppRoute.Unknown());

};
