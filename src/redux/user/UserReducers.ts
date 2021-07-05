import { AnyAction } from 'redux';
import { ProductModel } from './../cart/CartReducer';
import { USER_ACTIONS } from './UserActions';
import { MARK_USER_AS_LOGGED_IN, MARK_USER_AS_LOGGED_OUT } from './UserTypes';

export type UserModel = {
    email: string,
    name: string,
    profileImage: string,
    phone: number,
    wishList: ProductModel[],
    cartItems: ProductModel[],
    orders: ProductModel[],
    addresses: []
}

export type UserState = {
    user: UserModel,
    isUserLoggedIn: boolean
}

const initialState: UserState = {
    user: {
        email: '',
        name: '',
        profileImage: '',
        phone: -1,
        wishList: [],
        cartItems: [],
        orders: [],
        addresses: []
    },
    isUserLoggedIn: false
}

const userState = (
    state: UserState = initialState,
    action: AnyAction
) => {
    switch(action.type) {

        case MARK_USER_AS_LOGGED_IN: {

            if(action.userSnapShot) {
                const userToken = localStorage.getItem("userToken");
                return {
                    user: Object.assign({}, action.userSnapShot),
                    isUserLoggedIn: (userToken) ? true : false
                }
            }
            return state;
        }

        case MARK_USER_AS_LOGGED_OUT: {

            if(state) {
                return { ...state, state: initialState}
            }
            return state;
        }

        default:
            return state;
    }
}

export default userState;