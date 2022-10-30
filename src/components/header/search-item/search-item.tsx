import { MouseEventHandler } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, TabType } from '../../../const';
import { Camera } from '../../../types/camera';

type SearchItemProps = {
  camera: Camera,
  onSearchItemClick: MouseEventHandler<HTMLAnchorElement>,
}

function SearchItem({ camera, onSearchItemClick }: SearchItemProps) {
  const { name, id } = camera;

  return (
    <Link to={AppRoute.Product(id, TabType.Perks)} onClick={onSearchItemClick} tabIndex={-1}>
      <li className="form-search__select-item" tabIndex={0} >{name}</li>
    </Link>

  );
}

export default SearchItem;