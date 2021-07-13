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
import { FormattedMessage, useIntl } from 'react-intl';
import { COLOR_SELECTOR_OPTIONS, SIZE_SELECTOR_OPTIONS } from '../../constants/staticData';

import BuyNowModal from '../../components/organisms/modals/BuyNowModal/BuyNowModal';
import AddToCartModal from '../../components/organisms/modals/AddToCartModal/AddToCardModal';
import { toast } from 'react-toastify';


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
    const wishlistItems = useSelector<RootState, RootState["wishlistState"]>((state: RootState) => state.wishlistState).wishlistItems;
    
    const [similarProductSuggestions, setSimilarProductSuggestions] = useState<ProductModel[]>([]);
    const [product, setproduct] = useState<ProductModel | null>(null);

    const [selectedProduct, setSelectedProduct] = useState<ProductModel | null>(null);
    const [showBuyNow, setShowBuyNow] = useState<boolean>(false);
    const [showAddToCart, setShowAddToCart] = useState<boolean>(false);


    const {formatMessage} = useIntl();


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

    
    function onBuyNowHandler(suggestedProduct: ProductModel | null){
        if(suggestedProduct){
            setSelectedProduct(product);
            setShowBuyNow(true);
        }  
        else if(product){
            if(!product.size || !product.color){
                toast('Please select a size/color',{
                    type: 'error'
                })
            }
            else onBuyNowClickHandler(product.size.toString(), product.color, suggestedProduct !== null)
        }
    }

    function onAddToCartHandler(suggestedProduct: ProductModel | null){
       
       if(suggestedProduct){
            setSelectedProduct(suggestedProduct);
            setShowAddToCart(true);
       }
       else if(product){
           if(!product.size || !product.color){
               toast('Please select a size/color',{
                   type: 'error'
               })
           }
         else onAddtoCartClickHandler(product.size.toString(), product.color, suggestedProduct !== null)
       }
    }

    function onAddtoCartClickHandler(size: string, color: string, isMainProduct: boolean) {
        dispatch(addProductinToCart(Object.assign({}, isMainProduct ? product: selectedProduct, 
            {quantity: 1, size, color})));
        
        toast('Item added to cart!', {
            type: 'success'
        })
        setShowAddToCart(false);
    }

    function onBuyNowClickHandler(size: string, color: string, isMainProduct: boolean) {
        if(!userState.isUserLoggedIn) {
            dispatch(showLoginModal(true));
            return;
        }
        if(userState.isUserLoggedIn && (selectedProduct || product)) {
            dispatch(addProductinToCart(Object.assign({}, isMainProduct ? product : selectedProduct, 
                {quantity: 1, size, color})));
            history.push("/cart");
        }
    }


    const onAddToWishlistHandler = (product: ProductModel) => {
        
        dispatch(addProductinToWishlist(product));
    }

    const onBuyNowHide = () => {
        setShowBuyNow(false)
        setSelectedProduct(null);
    };
    const onAddToCartHide = () => {
        setShowAddToCart(false);
        setSelectedProduct(null);
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
                <BuyNowModal 
                    show={showBuyNow}
                    onHide={onBuyNowHide}
                    onBuyClick={(size: string, color: string) => onBuyNowClickHandler(size, color, false)}
                />
                <AddToCartModal 
                    show={showAddToCart}
                    onHide={onAddToCartHide}
                    onAddClick={(size: string, color: string) => onAddtoCartClickHandler(size, color, false)}
                    />
                   
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
                            <span className="productPriceInclusiveAllTaxes">
                                <FormattedMessage id="inclusive_taxes" />
                            </span>
                        </div>
                        <div className="productSizeSelectorWrapper">
                            <SizeSelector
                                label={formatMessage({id: 'select_size'})}
                                values={SIZE_SELECTOR_OPTIONS}
                                onSelectedChange={(selected:string) => {
                                    if(product) {
                                        product.size = +selected;
                                    }
                                }}
                            />
                        </div>
                        <div className="productColorSelectorWrapper">
                            <ColorSelector
                                label={formatMessage({id: 'select_colour'})}
                                values={COLOR_SELECTOR_OPTIONS}
                                onSelectedChange={(selected) => {
                                    if(product) {
                                        product.color = selected;
                                    }
                                }}
                            />
                        </div>
                        <div className="productDetailButtonActionsWrapper">
                            <div className="addToCartButton">
                                <ContainedButton
                                    label={formatMessage({id: 'buy_now'})}
                                    onClick={() => onBuyNowHandler(null)}
                                />
                            </div>
                            <div className="buyNowButton">
                                <ContainedButton
                                    label={formatMessage({id: 'add_to_cart'})}
                                    secondary={true}
                                    onClick={() => onAddToCartHandler(null)}
                                />
                            </div>
                        </div>
                        <div className="productDetailDiscriptionWrapper">
                            <span className="productDetailTitle">
                            <FormattedMessage id="product_details" />
                            </span>
                            <p className="productDetail">
                                White and sea green slim fit striped casual shirt, has a spread collar, button pocket,
                                1 pocket, long sleeves, curved hem
                            </p>
                            <span className="productDetailTitle">
                                <FormattedMessage id="size_fit" />
                            </span>
                            <p className="productDetail">
                                Slim Fit
                            </p>
                            <p className="productDetail">
                                The model is wearing size 40
                            </p>
                        </div>
                    </div>
                </div>
                <div className="similarProductsContainer">
                    <span className="similarProductsTitle">
                        <FormattedMessage id="similar_products" />
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
                                    buyNowHandler={(e) => onBuyNowHandler(product)} 
                                    addToCartHandler={() => onAddToCartHandler(product)}
                                    onClickHandler={(event: React.MouseEvent<Element, MouseEvent>) => {
                                    event.preventDefault();
                                    history.replace(`/item/${product.id}`);
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
