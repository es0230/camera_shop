import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { fetchCamerasByName } from '../../../store/api-actions';
import { selectCamerasSearchedByName, selectSearchLoaded } from '../../../store/app-data/selectors';
import CloseIcon from '../../svg/close-icon/close-icon';
import LensIcon from '../../svg/lens-icon/lens-icon';
import SearchItem from '../search-item/search-item';

function SearchForm() {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(selectCamerasSearchedByName);
  const isDataLoaded = useAppSelector(selectSearchLoaded);

  useEffect(() => {
    if (searchQuery.length !== 0) {
      dispatch(fetchCamerasByName(searchQuery));
    }
  }, [dispatch, searchQuery]);

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
    <div data-testid="formSearch" className={`form-search ${searchQuery.length !== 0 ? 'list-opened' : ''}`}>
      <form>
        <label>
          <LensIcon />
          <input className="form-search__input" data-testid="searchInput" type="text" autoComplete="off" placeholder="Поиск по сайту" value={searchQuery} onInput={handleSearchFormInput} />
        </label>
        <ul className="form-search__select-list">
          {isDataLoaded ? <p>Загрузка...</p> : <> </>}
          {!isDataLoaded && (cameras.length ?
            cameras.map((el) => <SearchItem camera={el} onSearchItemClick={onSearchItemClick} key={el.id} />) :
            <div style={{ textAlign: 'center' }}>Подходящих товаров нет :(</div>)}
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
