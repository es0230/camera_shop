import { useAppSelector } from '../../../../hooks';
import { selectCameras } from '../../../../store/app-data/selectors';
import CatalogCard from '../catalog-card/catalog-card';

function CatalogGallery(): JSX.Element {
  const cameras = useAppSelector(selectCameras);

  return (
    <div className="cards catalog__cards">
      {cameras.map((el) => <CatalogCard camera={el} key={el.id} />)}
    </div>
  );
}

export default CatalogGallery;
