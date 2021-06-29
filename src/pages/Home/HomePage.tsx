import React from 'react'
import './HomePage.scss';

import PageTemplate from '../../components/templates/PageTemplate';
import ImageSlider from '../../components/molecules/ImageSlider/ImageSlider';
import ProductCard from '../../components/organisms/productCard/ProductCard';

import { useHistory } from 'react-router-dom';

const banners = [
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80",
    "https://images.unsplash.com/photo-1467043237213-65f2da53396f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
  ];

const HomePage = () => {
    const history = useHistory();
    
    function renderBody() {
        return (
            <div className="bodyComponent">
                <div className="bannerColumnContainer">
                    <ImageSlider id="heroBanner" name="heroBanner" images={banners} style={{height: "500px"}}/>
                </div>
                <div className="productListColumnContainer">
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle">Categories to bag</h4>
                        <a href="">
                            <h4 className="textBannerTitleLink">View All</h4>
                        </a>
                    </div>
                    <div className="productListContainer">
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                    </div>
                </div>
                <div className="productListColumnContainer">
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle">Categories to bag</h4>
                        <a href="">
                            <h4 className="textBannerTitleLink">View All</h4>
                        </a>
                    </div>
                    <div className="productListContainer">
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                    </div>
                </div>
                <div className="productListColumnContainer">
                    <div className="textBannerContainer">
                        <h4 className="textBannerTitle">Categories to bag</h4>
                        <a href="">
                            <h4 className="textBannerTitleLink">View All</h4>
                        </a>
                    </div>
                    <div className="productListContainer">
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                        <ProductCard productTitle="Jack & Jones T-Shirt" price={300} discountPercent={50} imgs={banners} buyNowHandler={(e) => history.push('item')} addToCartHandler={(e) => {console.log("Add to Cart Clicked")}}/>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <div>
            <PageTemplate>
                {renderBody()}
            </PageTemplate>
        </div>
    )
}

export default HomePage;
