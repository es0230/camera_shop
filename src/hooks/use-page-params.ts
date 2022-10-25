import { useParams } from 'react-router-dom';

export const usePageParams = () => {
  const { page, type, order } = useParams();

  if (page !== undefined && type !== undefined && order !== undefined) {
    return { page: Number(page), type, order };
  }
};
