import { useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { selectCameras } from '../../../store/app-data/selectors';
import CloseIcon from '../../svg/close-icon/close-icon';
import LensIcon from '../../svg/lens-icon/lens-icon';
import SearchItem from '../search-item/search-item';

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const cameras = useAppSelector(selectCameras);
  const itemsToRender = searchQuery === '' ? [] : cameras.filter((el) => el.name.match(new RegExp(searchQuery, 'i')));

  const handleSearchFormInput = (evt: React.FormEvent<HTMLInputElement>) => {
    const { value } = evt.currentTarget;
    setSearchQuery(value);
  };

  const handleClearButtonClick = () => {
    setSearchQuery('');
  };

  const onSearchItemClick = () => {
    setSearchQuery('');
  };

  return (
    <div className={`form-search ${searchQuery.length !== 0 ? 'list-opened' : ''}`}>
      <form>
        <label>
          <LensIcon />
          <input className="form-search__input" data-testid="searchInput" type="text" autoComplete="off" placeholder="Поиск по сайту" value={searchQuery} onInput={handleSearchFormInput} />
        </label>
        <ul className="form-search__select-list">
          {itemsToRender.length ?
            itemsToRender.map((el) => <SearchItem camera={el} onSearchItemClick={onSearchItemClick} key={el.id} />) :
            <div style={{ textAlign: 'center' }}>Подходящих товаров нет :(</div>}
        </ul>
      </form>
      <button className="form-search__reset" data-testid="clearButton" type="reset" onClick={handleClearButtonClick}>
        <CloseIcon />
        <span className="visually-hidden">Сбросить поиск</span>
      </button>
    </div>
  );
}

export default SearchForm;
