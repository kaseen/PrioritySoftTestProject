import { Box } from '@mui/material';

const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
}

const displayBoxStyle = {
    padding: '10px',
    //border: '2px solid black',
    width: '180px',
    height: '180px'
};

export const Categories = ({ categories, onCategoryClick }) => {
    return (
        categories[0] !== null ?
        <Box sx={style}>
            {
                categories.map((category, index) => (
                    <Box key={index} sx={displayBoxStyle}>
                        <img
                            style={{ width: 180 }}
                            src={category.categoryImg}
                            alt={index}
                            onClick={() => onCategoryClick(category.categoryLink)}
                        />
                        <Box>
                            {category.categoryText}
                        </Box>
                    </Box>
                ))
            }
        </Box>
        :
        <Box sx={style}></Box>
    )
}

export const Products = ({ products, onProductClick }) => {
    return (
        products[0] !== null ?
        <Box sx={style}>
            {
                products.map((product, index) => (
                    <Box key={index} sx={{ ...displayBoxStyle, height: '250px' }}>
                        <img
                            style={{ width: 180 }}
                            src={product.productImg}
                            alt={index}
                            onClick={() => onProductClick(product.productLink)}
                        />
                        <Box>
                            {
                                product.productName.length > 60 ?
                                `${product.productName.substring(0, 60)}...`
                                :
                                product.productName
                            }
                        </Box>
                        <Box sx={{ fontWeight: 'bold' }}>
                            Price: {product.productPrice}
                        </Box>
                    </Box>
                ))
                }
        </Box>
        :
        <Box sx={style}></Box>
    )
}