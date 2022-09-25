import { Camera } from '../../../../types/camera';
import CatalogCard from '../catalog-card/catalog-card';

type CatalogGalleryProps = {
  cameras: Camera[],
}

function CatalogGallery({ cameras }: CatalogGalleryProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {cameras.map((el) => <CatalogCard camera={el} key={el.id} />)}
    </div>
  );
}

export default CatalogGallery;
