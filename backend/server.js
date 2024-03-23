const puppeteer = require('puppeteer');
const express = require('express');
const cors = require('cors');

const { getCategories, navigatePageTo, listProducts } = require('./etsy');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/categories', async (_, res) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const url = 'https://www.etsy.com/';
    await navigatePageTo(page, url);
    const categories = await getCategories(page);

    res.send(JSON.stringify(categories));

    await browser.close();
});

app.post('/products', async (req, res) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    await navigatePageTo(page, req.body.categoryLink);
    const products = await listProducts(page);

    res.send(JSON.stringify(products));

    await browser.close();
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});