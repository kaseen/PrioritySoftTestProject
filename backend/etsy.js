const getCategories = async (page) => {
    try {
        await page.waitForSelector('.shop-by-category-section');

        // Create an object that includes the text, image, and URL for each category
        const categories = await page.evaluate(
            () => Array.from(document.querySelectorAll('.shop-by-category-section .wt-block-grid__item .wt-card'), (e) => ({
                categoryText: e.querySelector('p').innerText,
                categoryImg: e.querySelector('img').src,
                categoryLink: e.querySelector('a').href
            }))
        );

        return categories;
    } catch (e) {
        console.log(e);
        console.log('Error in getCategories');
        return [];
    }
}

const navigatePageTo = async (page, url) => {
    await page.goto(url);
    console.log(`Navigating to ${page.url()}`);
}

const listProducts = async (page) => {
    try {
        await page.waitForSelector('#content');

        const products = await page.evaluate(
            () => {
                // Parse the price if it includes discounts
                const parsePrice = (priceText) => {
                    let result = priceText;
                    if(result.startsWith('Sale')){
                        const indexStart = priceText.indexOf('USD');
                        const indexEnd = priceText.indexOf('\n');
                        result = result.substring(indexStart, indexEnd);
                    }

                    return result;
                }

                // Generate an object containing the product's name, image, link, and price
                return Array.from(document.querySelectorAll('#content .search-listings-group ol [data-appears-component-name]'), (e) => ({
                    productName: e.querySelector('a').getAttribute('title'),
                    productImg: e.querySelector('[data-listing-card-listing-image]').getAttribute('src'),
                    productLink: e.querySelector('a').href,
                    productPrice: parsePrice(e.querySelector('.lc-price').innerText)
                }))
            }
        );

        return products.slice(0, 10);
    } catch (e) {
        console.log(e);
        console.log('Error in listProducts');
        return [];
    }
}

const getProductOptions = async (page) => {
    const parseVariations = (input) => {           
        input = input.map(option => option.replace(/^\n\s*/g, ''));
        input = input.map(option => option.replace(/\n$/g, ''));
        if(input[0] === 'Select an option')
            input.shift();

        return input;
    }

    const queryMain = '#content #listing-page-cart [data-buy-box] ';
    const queryQuantity = queryMain + '[data-selector="listing-page-quantity"] option';

    try {
        let i = 0;
        const variationsResult = [];
        while(true) {
            let queryVariationName = queryMain + `[data-selector="listing-page-variations"] #label-variation-selector-${i} span`;
            let queryVariationsOptions = queryMain + `[data-selector="listing-page-variations"] #variation-selector-${i} option`;

            console.log(`> Scraping ${queryVariationsOptions}`);
            const variationOptions = await page.evaluate(
                (queryVariationsOptions) => Array.from(document.querySelectorAll(queryVariationsOptions), (e) => e.innerText), queryVariationsOptions
            );

            if(variationOptions.length === 0)
                break;

            console.log(`> Scraping ${queryVariationName}`);
            const variationName = await page.evaluate(
                (queryVariationName) => Array.from(document.querySelectorAll(queryVariationName), (e) => e.innerText), queryVariationName
            );

            variationsResult.push({
                name: variationName[0],
                options: parseVariations(variationOptions)
            });

            i++;
        }

        const quantity = await page.evaluate(
            (queryQuantity) => Array.from(document.querySelectorAll(queryQuantity), (e) => e.value), queryQuantity
        );

        if(quantity.length !== 0)
            variationsResult.push({ quantity: quantity });

        return variationsResult;
    } catch (e) {
        console.log(e);
        console.log('Error in getProductInfo');
        return [];
    }
}

module.exports = {
    getCategories,
    navigatePageTo,
    listProducts,
    getProductOptions
}