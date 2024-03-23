import { useEffect, useState } from 'react';
import { Categories, Products } from './UI';
import axios from 'axios';

function App() {

    const [categories, setCategories] = useState([null]);

    useEffect(() => {
        if(categories[0] === null){
            axios.get('http://localhost:4000/categories').then((res) => {
                setCategories(res.data);
            });
        }
    })

    return (
        <div>
            <Categories categories={categories}/>
            <Products/>
        </div>
    );
}

export default App;
