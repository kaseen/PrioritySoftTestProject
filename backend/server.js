const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const { getCategories, navigatePageTo, listProducts } = require('./etsy');

const app = express();

app.use(cors());

app.get('/categories', async (req, res) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const url = 'https://www.etsy.com/';
    await navigatePageTo(page, url);
    const categories = await getCategories(page);

    res.send(JSON.stringify(categories));

    await browser.close();
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

/*(async () => {
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
})();*/