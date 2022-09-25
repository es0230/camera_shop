import { useParams } from 'react-router-dom';

export const usePageNumber = () => {
  const { page } = useParams();
  if (page) {
    return Number(page[page.length - 1]);
  }
};
