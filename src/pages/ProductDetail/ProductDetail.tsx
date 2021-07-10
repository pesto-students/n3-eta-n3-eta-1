import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from '../../api/axios';

import './ProductDetail.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import SizeSelector from '../../components/organisms/sizeSelector/SizeSelector';
import ColorSelector from '../../components/organisms/colorSelector/ColorSelector';
import ContainedButton from '../../components/atoms/containedButton/ContainedButton';
import CustomerReview, { CustomerReviewType } from '../../components/organisms/customerReview/CustomerReview';
import ProductCard from '../../components/organisms/ProductCard/ProductCard';

import { ProductModel } from '../../redux/cart/CartReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addProductinToCart, addProductinToWishlist } from '../../redux/user/UserActions';
import { showLoginModal } from '../../redux/loginModal/LoginModalActions';

const SIZE_SELECTOR_OPTIONS = ['39', '40', '41', '42'];
const COLOR_SELECTOR_OPTIONS = ['turqoise', 'blue', 'green', 'yellow'];
const REVIEW : CustomerReviewType = {
    title: 'This product is awesome',
    text: 'Loved using this product! Every single thing was perfect',
    reviewerName: 'Prateek',
    date: '20 Dec 2017',
    score: 3
  }

function ProductDetailPage() {

    const history = useHistory();
    const dispatch = useDispatch();
    const {productId} = useParams<Record<string, string | undefined>>();
    const userState = useSelector<RootState , RootState["userState"]>((state: RootState) => state.userState);
    const [product, setproduct] = useState<ProductModel | null>(null);
    const [similarProductSuggestions, setSimilarProductSuggestions] = useState<ProductModel[]>([]);
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    
    const fetchProductDetails= async () => {
        const response = await axios.get(`/products/${productId}`);
        if(response.data) {
            setproduct(response.data);
        }
    }

    const fetchSimilarProductSuggestions = async () => {
        const response = await axios.get(`/products?category=${product?.category}`);
        if(response.data) {
            setSimilarProductSuggestions(response.data);
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [productId]);

    useEffect( () => {
        fetchSimilarProductSuggestions();
    }, [product]);

    const onAddToWishlistHandler = (product: ProductModel) => {
        dispatch(addProductinToWishlist(product));
    }

    function onAddtoCartButtonClickHandler(product: ProductModel | null) {
        dispatch(addProductinToCart(product as ProductModel));
    }

    function onBuyNowButtonClickHandler(product: ProductModel | null) {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        if(userState.isUserLoggedIn && product) {
            dispatch(addProductinToCart(Object.assign({}, product, {quantity: 1})));
            history.push("/checkout");
        }
    }

    function renderBody() {

        function displayPrice() {
            let _price = product?.price;
            const _discountPercent = product?.discountPercent;
            if(_price && _discountPercent && _discountPercent > 0) {
                _price = (_price * _discountPercent) / 100;
            }
            return (
                <span className="productPriceWrapper">
                    ₹{_price}
                </span>
            );
        }
        
        function displayDiscountPrice() {
            if(!product?.discountPercent || product?.discountPercent == 0) {
                return (<></>);
            }
            return (
                <>
                    <span className="productDiscountPriceWrapper">
                        ₹{product?.price}
                    </span>
                    <span className="productDiscountPercentageWrapper">
                        ({product.discountPercent}% Off)
                    </span>
                </>
            );
        }

        return (
            <div className="productDetailPage">
                <div className="productDetailComponent">
                    <div className="productImageSliderContainer">
                        <ImageSlider
                            id="productImageSlider"
                            name="productImageSlider"
                            images={(product?.images) ? product.images : []} 
                            style={{ height: "504px"}}
                        />
                    </div>
                    <div className="productDetailContainer">
                        <div className="productTitleWrapper">
                            <h2 className="productTitle">{product?.name}</h2>
                        </div>
                        <div className="productDiscriptionWrapper">
                            <h4 className="productDiscritpion">{product?.name}</h4>
                        </div>
                        <div className="productDetailPriceWrapper">
                            {displayPrice()}
                            {displayDiscountPrice()}
                        </div>
                        <div className="productPriceInclusiveAllTaxesWrapper">
                            <span className="productPriceInclusiveAllTaxes">inclusive of all taxes</span>
                        </div>
                        <div className="productSizeSelectorWrapper">
                            <SizeSelector
                                label="select size"
                                values={SIZE_SELECTOR_OPTIONS}
                                onSelectedChange={(selected:string) => {
                                    console.log(selected);
                                    if(product) {
                                        product.size = +selected;
                                    }
                                }}
                            />
                        </div>
                        <div className="productColorSelectorWrapper">
                            <ColorSelector
                                label="select colour"
                                values={COLOR_SELECTOR_OPTIONS}
                                onSelectedChange={(selected) => {
                                    console.log(selected);
                                    if(product) {
                                        product.color = selected;
                                    }
                                }}
                            />
                        </div>
                        <div className="productDetailButtonActionsWrapper">
                            <div className="addToCartButton">
                                <ContainedButton
                                    label="Add to Cart"
                                    onClick={() => onAddtoCartButtonClickHandler(product)}
                                />
                            </div>
                            <div className="buyNowButton">
                                <ContainedButton
                                    label="Buy Now"
                                    secondary={true}
                                    onClick={() => onBuyNowButtonClickHandler(product)}
                                />
                            </div>
                        </div>
                        <div className="productDetailDiscriptionWrapper">
                            <span className="productDetailTitle">
                                product details
                            </span>
                            <p className="productDetail">
                                White and sea green slim fit striped casual shirt, has a spread collar, button pocket,
                                1 pocket, long sleeves, curved hem
                            </p>
                            <span className="productDetailTitle">
                                size and fit
                            </span>
                            <p className="productDetail">
                                Slim Fit
                            </p>
                            <p className="productDetail">
                                The model is wearing size 40
                            </p>
                        </div>
                        <div className="productCustomerReviewWrapper">
                            <span className="productCustomerReviewTitle">
                                customer reviews
                            </span>
                            <div className="productCustomerReview">
                                <CustomerReview
                                    review={REVIEW}
                                />
                                <CustomerReview
                                    review={REVIEW}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="similarProductsContainer">
                    <span className="similarProductsTitle">
                        similar products
                    </span>
                    <div className="similarProductListWrapper">
                    {   similarProductSuggestions &&
                        similarProductSuggestions.map((product: any) => {

                            const isAddedInWishlist = wishlistItems.filter(item => item.id === product.id).length > 0;
                            return (<ProductCard key={product.id}
                                productTitle={product.name} 
                                price={product.price} 
                                discountPercent={product.discountPercent} 
                                imgs={product.images} 
                                isAddedInWishlist={isAddedInWishlist}
                                onAddToWishlist={() => onAddToWishlistHandler(product)}
                                buyNowHandler={(e) => onBuyNowButtonClickHandler(product)} 
                                addToCartHandler={() => onAddtoCartButtonClickHandler(product)}
                                onClickHandler={(event: React.MouseEvent<Element, MouseEvent>) => {
                                    event.preventDefault();
                                    // onProductCardClickHandler(product.id);
                                }}
                            />)
                        })
                    }
                    </div>
                </div>
            </div>
        );
    }


    return (
            <PageTemplate>{renderBody()}</PageTemplate>
    )
}

export default ProductDetailPage;
