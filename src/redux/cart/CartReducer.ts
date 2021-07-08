import { AnyAction } from 'redux';
import { CART_ACTIONS } from './CartAction';
import { 
    ADD_PRODUCT_TO_CART, RESET_CART
} from './CartTypes';
import { getProductIndex } from './utils'

export type ProductModel = {
    id: number,
    name: string,
    price: number | 0,
    discountPercent: number | 0,
    images: string[],
    category: string,
    size: number | 0,
    color: string,
    quantity: number
}

export type CartState ={
    cartItems: ProductModel[],
    isBuyItemActive: boolean
}

export const cartInitialState = {
    cartItems: [],
    isBuyItemActive: false
};

const cartState = (
    state: CartState = cartInitialState,
    action: AnyAction 
) => {
    switch(action.type) {

        case ADD_PRODUCT_TO_CART: {
            const product: ProductModel = action.payload;
            const index = getProductIndex(state.cartItems, product.id);

            if(index == -1) {
                return { ...state, cartItems: [...state.cartItems, action.payload]}
            }

            const currentProduct = state.cartItems[index];
            const updateProduct = Object.assign({}, currentProduct, {quantity: currentProduct.quantity + product.quantity});
            return { ...state, cartItems: [
                ...state.cartItems.slice( 0, index ),
                updateProduct,
                ...state.cartItems.slice( index + 1 ),
            ]}
        }

        case RESET_CART: {
            return cartInitialState;
        }

        default:
            return state;
    }
}

export default cartState;