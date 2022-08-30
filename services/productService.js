const productDao = require('../models/productDao');

const getProductsCovers = async (limis, offset) => {
    const getProductsIds = await productDao.getProductsIds();

    if (offset > getProductsIds.length) {
        const err = new Error("INVALID_OFFSET_OR_LIMIT");
        err.statusCode = 404;
        throw err;
    }
    const 
}