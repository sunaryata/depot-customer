import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface UserModel {
  data: [];
  random: [];
  profile: {};
  token: string;
}

const initialState: UserModel | any = null;

const slice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setProfile(state: UserModel, actions: PayloadAction<any>) {
      return {...state, profile: actions.payload};
    },
    setToken(state: UserModel, actions: PayloadAction<string>) {
      return {...state, token: actions.payload};
    },

    removeToken(state: UserModel) {
      return {...state, token: '', profile: {}};
    },
  },
});

export const {setProfile, setToken, removeToken} = slice.actions;
export default slice.reducer;
