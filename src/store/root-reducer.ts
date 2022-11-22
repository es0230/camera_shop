import { combineReducers } from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { appData } from './app-data/app-data';
import { catalogParameters } from './catalog-parameters/catalog-parameters';
import { userData } from './user-data/user-data';

export const rootReducer = combineReducers({
  [NameSpace.Data]: appData.reducer,
  [NameSpace.Filters]: catalogParameters.reducer,
  [NameSpace.User]: userData.reducer,
});
