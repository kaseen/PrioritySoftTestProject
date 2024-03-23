import { useEffect, useState } from 'react';
import { Categories, Products } from './UI';
import axios from 'axios';

function App() {

    const [categories, setCategories] = useState([null]);
    const [products, setProducts] = useState([null]);

    useEffect(() => {
        if(categories[0] === null){
            axios.get('http://localhost:4000/categories')
            .then(res => {
                setCategories(res.data);
            })
            .catch(_ => {
                console.log('Error fetching categories');
            });
        }
    })

    const onCategoryClick = (categoryLink) => {
        axios.post('http://localhost:4000/products', { categoryLink })
        .then((res) => {
            setProducts(res.data);
        })
        .catch(_ => {
            console.log('Error fetching products');
        });
    }

    const onProductClick = (productLink) => {
        console.log(productLink);
    }

    return (
        <div>
            <Categories categories={categories} onCategoryClick={onCategoryClick}/>
            <Products products={products} onProductClick={onProductClick}/>
        </div>
    );
}

export default App;