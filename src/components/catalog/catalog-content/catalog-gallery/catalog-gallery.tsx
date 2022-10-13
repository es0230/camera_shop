import { Camera } from '../../../../types/camera';
import CameraCard from '../../../camera-card/camera-card';

type CatalogGalleryProps = {
  cameras: Camera[],
}

function CatalogGallery({ cameras }: CatalogGalleryProps): JSX.Element {

  return (
    <div data-testid="catalog-gallery-component" className="cards catalog__cards">
      {cameras.map((el) => <CameraCard camera={el} key={el.id} />)}
    </div>
  );
}

export default CatalogGallery;
