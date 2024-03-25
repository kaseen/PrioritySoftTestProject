import { Box, CircularProgress, Select, MenuItem } from '@mui/material';

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

const displayText = {
    fontSize: '25px',
    padding: '10px'
}

export const ScrapingBar = ({ scraping }) => {
    return (
        scraping.valid === true ?
        <Box sx={displayText}>
            Scraping for {scraping.current}
            <CircularProgress size='25px' sx={{ color: 'black' }}/>
        </Box>
        : <Box sx={displayText}>Nothing to scrape</Box>
    )
}

export const Categories = ({ categories, onCategoryClick }) => {
    return (
        categories[0] === null ?
        <Box></Box>
        :
        <Box>
            <Box sx={displayText}>CATEGORIES:</Box>
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
        </Box>       
    )
}

export const Products = ({ products, onProductClick }) => {
    return (
        products[0] === null ?
        <Box></Box>
        :
        <Box>
            <Box sx={{ ...displayText, marginTop: '30px' }}>PRODUCTS:</Box>
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
        </Box>
    )
}

export const Options = ({ options }) => {
    return (
        options[0] === null ?
        <Box></Box>
        :
        <Box>
            {options.map((option, i) => (
                <Box key={i} sx={{ padding: '10px' }}>
                    <Box sx={{ fontSize: '18px', fontWeight: 'bold' }}>{option.name}</Box>
                    <Select defaultValue="" sx={{ minWidth: 200 }}>
                        {option.options.map((selector, j) => (
                            <MenuItem key={j} value={selector} >{selector}</MenuItem>
                        ))}
                    </Select>
                </Box>
            ))}
        </Box>
    )
}