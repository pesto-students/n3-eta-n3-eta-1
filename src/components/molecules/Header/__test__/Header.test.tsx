import React from 'react';
import Header from "../Header";
import * as ReactDOM from 'react-dom';

/**
 * @jest-environment jsdom
 */
describe("Header Component Test", () => {

    let container: HTMLDivElement

    beforeEach(() => {
        container = document.createElement('div');
        document.body.appendChild(container);
    })

    afterEach(() => {
        document.body.removeChild(container);
        container.remove();
    })

    it("Render Header Component Correctly", () => {
        ReactDOM.render(
            <Header/>
        , container);
        const categoryNavigationLinks = document.querySelectorAll("label");
        expect(categoryNavigationLinks).toHaveLength(2);
        expect(categoryNavigationLinks[0].getAttribute('className')).toBe("navLinks");
    })
})