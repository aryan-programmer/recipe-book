import {Observable} from "rxjs";

export type Optional<T> = T | null | undefined;
export type Null<T> = T | null;
export type Undefined<T> = T | undefined;
export type Object = { [key: string | symbol | number]: Object | any };
export type PromiseOrT<T> = Promise<T> | T;
export type ObservableOrT<T> = Observable<T> | T;
export type PromiseOrObservableOrT<T> = Promise<T> | Observable<T> | T;
