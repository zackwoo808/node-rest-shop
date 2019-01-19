const express = require('express');
const app     = express();
const morgan  = require('morgan');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

// logging incoming requests
app.use(morgan('dev'));

// routes that should handle requests
app.use('/products' , productRoutes);
app.use('/orders', orderRoutes);

// error handling
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error); // forwards error request instead of original request
});

app.use((error, req, res, next) => {
    res.status(error.stats || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;