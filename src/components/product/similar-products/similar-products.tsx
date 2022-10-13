import { useEffect, useState } from 'react';
import { Camera } from '../../../types/camera';
import CameraCard from '../../camera-card/camera-card';

type SimilarProductsProps = {
  id: number,
  similarProducts: Camera[],
}

function SimilarProducts({ id, similarProducts }: SimilarProductsProps): JSX.Element {

  useEffect(() => {
    setActiveLeftCard(0);
  }, [id]);

  const [activeLeftCard, setActiveLeftCard] = useState(0);

  return similarProducts.length === 0 ?
    <> </> :
    <section data-testid="similar-products-component" className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {similarProducts.map((el, i) => <CameraCard camera={el} isActive={i >= activeLeftCard && i <= activeLeftCard + 2} key={el.id} />)}
          </div>
          <button data-testid="slider-controls--prev" className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" onClick={() => setActiveLeftCard(activeLeftCard - 1)} disabled={activeLeftCard === 0}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
          <button data-testid="slider-controls--next" className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд" onClick={() => setActiveLeftCard(activeLeftCard + 1)} disabled={activeLeftCard >= similarProducts.length - 3}>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow" />
            </svg>
          </button>
        </div>
      </div>
    </section>;
}

export default SimilarProducts;
