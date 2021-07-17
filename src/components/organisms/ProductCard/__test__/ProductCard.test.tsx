import React from 'react';
import ProductCard from '../ProductCard';
import * as ReactDOM from 'react-dom';

/**
 * @jest-environment jsdom
 */
describe("Product Card Component Tests", () => {

    let container: HTMLDivElement

    const testProductData = {
        productTitle: "Polo Tshirt",
        price: 285,
        discountPercent: 40,
        imgs: ["test-imageUrl1"],
        addToCartHandler: () => { console.log("From Add to cart Handler"); },
        onClickHandler: () => { console.log("From on Product Card Click Handler"); },
        onAddToWishlist: () => { console.log("From Add to wish list Handler"); },
        onRemoveFromWishlistClick: () => { console.log("From Remove from wish list Handler"); },
        isAddedInWishlist: false,
        withoutWishlistActions: false,

    }

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it("Renders Product Card Component Correctly", () => {
        ReactDOM.render(
            <ProductCard
                productTitle={testProductData.productTitle}
                price={testProductData.price}
                discountPercent={testProductData.discountPercent}
                imgs={testProductData.imgs}
                addToCartHandler={testProductData.addToCartHandler}
                onClickHandler={testProductData.onClickHandler}
                onAddToWishlist={testProductData.onAddToWishlist}
                onRemoveFromWishlistClick={testProductData.onRemoveFromWishlistClick}
                isAddedInWishlist={testProductData.isAddedInWishlist}
                withoutWishlistActions={testProductData.withoutWishlistActions}
            />
        , container);
        const productTitleElement = document.getElementsByClassName('productTitleBar');
        expect(productTitleElement).not.toBeNull();
        expect(productTitleElement).toHaveLength(1);
        expect(productTitleElement[0].textContent).toBe(testProductData.productTitle);
    })
})