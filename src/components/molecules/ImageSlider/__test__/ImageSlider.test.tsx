import React from 'react';
import ImageSlider from '../ImageSlider';
import * as ReactDOM from 'react-dom';

/**
 * @jest-environment jsdom
 */
describe("Image Slider Component Tests", () => {

    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it("Renders Image Slider Component Correctly", () => {
        ReactDOM.render(
            <ImageSlider
                id="test-image-slider"
                name="test-image-slider"
                images={["test-imageUrl1, test-imageUrl2"]}
                style={{ height: "504px"}}
            />
        , container);
        const images = document.querySelectorAll("img");
        expect(images).toHaveLength(2);
        expect(images[0].getAttribute('src')).toBe("test-imageUrl1");
    })
})