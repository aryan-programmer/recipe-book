import {createReducer, on} from "@ngrx/store";
import * as Auth from "./auth.actions";

const initialState: Auth.State = {
	user: undefined,
	isLoading: false
};

export const reducer = createReducer(
	initialState,
	on(Auth.LoginStart, Auth.RegisterStart, (state) => {
		return {...state, isLoading: true,};
	}),
	on(Auth.AuthSuccess, (state, {user}) => {
		return {...state, user, isLoading: false,};
	}),
	on(Auth.AuthFailed, Auth.Logout, (state) => {
		return {...state, user: null, isLoading: false,};
	}),
);
