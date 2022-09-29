import { useEffect, useState } from 'react';
import { APIRoute } from '../../../const';
import { api } from '../../../store';
import { Camera } from '../../../types/camera';
import CameraCard from '../../camera-card/camera-card';

type SimilarProductsProps = {
  id: number,
}

function SimilarProducts({ id }: SimilarProductsProps): JSX.Element {
  const [similarProducts, setSimilarProducts] = useState<Camera[] | null>(null);
  const [activeLeftCard, setActiveLeftCard] = useState(1);

  useEffect(() => {
    api.get(`${APIRoute.Cameras}/${id}/similar`,)
      .then(({ data }) => setSimilarProducts(data))
      .catch(() => setSimilarProducts(null));
    setActiveLeftCard(1);
  }, [id]);

  if (similarProducts === null) {
    return (
      <>

      </>
    );
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarProducts.map((el, i) => <CameraCard camera={el} isActive={i >= activeLeftCard && i <= activeLeftCard + 2} key={el.id} />)}
          </div>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={() => setActiveLeftCard(activeLeftCard - 1)} disabled={activeLeftCard === 1}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onClick={() => setActiveLeftCard(activeLeftCard + 1)} disabled={activeLeftCard === similarProducts.length - 3}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default SimilarProducts;
