import { Link } from 'react-router-dom';
import { AppRoute, TabType } from '../../const';
import { Promo } from '../../types/promo';

type AdProps = {
  ad: Promo | null,
}

function Ad({ ad }: AdProps): JSX.Element {
  if (ad) {
    const { name, previewImg, previewImg2x, previewImgWebp, previewImgWebp2x, id } = ad;

    return (
      <div data-testid="ad-component" className="banner">
        <picture>
          <source type="image/webp" srcSet={`../../${previewImgWebp}, ../../${previewImgWebp2x} 2x`} />
          <img src={`../../${previewImg}`} srcSet={`../../${previewImg2x} 2x`} width="1280" height="280" alt="баннер" />
        </picture>
        <p className="banner__info">
          <span className="banner__message">Новинка!</span>
          <span className="title title--h1">{name}</span>
          <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
          <Link className="btn" to={AppRoute.Product(String(id), TabType.Perks)}>Подробнее</Link>
        </p>
      </div>
    );
  }

  return (
    <>

    </>
  );
}

export default Ad;
