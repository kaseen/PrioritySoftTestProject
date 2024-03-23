import { Box } from '@mui/material';

const style = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    border: '1px solid red'
}

export const Categories = ({ categories }) => {
    return (
        categories[0] !== null ?
        <Box sx={style}>
            {
                categories.map((category, index) => (
                    <Box key={index} sx={{ padding: '10px' }}>
                        <img
                            style={{ width: 180 }}
                            src={category.categoryImg}
                            alt={index}
                            onClick={() => console.log(category.categoryLink)}
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

export const Products = () => {
    return (
        <Box sx={style}>
            PRODUCTS
        </Box>
    )
}