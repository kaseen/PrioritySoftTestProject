import { useEffect, useState } from 'react';
import { ScrapingBar, Categories, Products } from './UI';
import axios from 'axios';

function App() {

    const [categories, setCategories] = useState([null]);
    const [products, setProducts] = useState([null]);
    const [scraping, _setScraping] = useState({
        current: '',
        valid: true
    });

    const setScraping = (current, valid) => {
        const tmp = { 
            current: current + ' ',
            valid
        };

        _setScraping(tmp);
    }

    useEffect(() => {
        if(categories[0] === null){
            setScraping('categories', true);

            axios.get('http://localhost:4000/categories')
            .then(res => {
                setCategories(res.data);
                setScraping('', false);
            })
            .catch(_ => {
                console.log('Error fetching categories');
            });
        }
    }, [categories]);

    const onCategoryClick = (categoryLink) => {
        setScraping('products', true);

        axios.post('http://localhost:4000/products', { categoryLink })
        .then((res) => {
            setProducts(res.data);
            setScraping('', false);
        })
        .catch(_ => {
            console.log('Error fetching products');
        });
    }

    const onProductClick = (productUrl) => {
        setScraping('options', true);

        axios.post('http://localhost:4000/options', { productUrl })
        .then((res) => {
            console.log(res.data);
            setScraping('', false);
        })
        .catch(_ => {
            console.log('Error fetching options');
        });
    }

    return (
        <div>
            <ScrapingBar scraping={scraping}/>
            <Categories categories={categories} onCategoryClick={onCategoryClick}/>
            <Products products={products} onProductClick={onProductClick}/>
        </div>
    );
}

export default App;