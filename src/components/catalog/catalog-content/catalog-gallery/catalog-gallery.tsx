import { Camera } from '../../../../types/camera';
import CameraCard from '../../../camera-card/camera-card';

type CatalogGalleryProps = {
  cameras: Camera[],
}

function CatalogGallery({ cameras }: CatalogGalleryProps): JSX.Element {

  return (
    <div className="cards catalog__cards">
      {cameras.map((el) => <CameraCard camera={el} key={el.id} />)}
    </div>
  );
}

export default CatalogGallery;
