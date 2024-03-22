const puppeteer = require('puppeteer');

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
        return []
    }
}

(async () => {
    // Launch the browser
    const browser = await puppeteer.launch({ headless: false });
    
    // Create a page
    const page = await browser.newPage();

    const url = 'https://www.etsy.com/';

    await navigatePageTo(page, url);

    const categories = await getCategories(page);
    await navigatePageTo(page, categories[0].categoryLink);

    const products = await listProducts(page);

    console.log(products)

    // Close the browser
    await browser.close();
})();