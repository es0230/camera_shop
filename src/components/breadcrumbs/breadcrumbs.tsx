import { useLocation } from 'react-router-dom';

function Breadcrumbs(): JSX.Element {
  const location = useLocation();
  // eslint-disable-next-line no-console
  console.log(location.pathname.split('/')[1]);

  return (
    <>

    </>
  );
}

export default Breadcrumbs;
