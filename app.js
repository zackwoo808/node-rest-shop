const express    = require('express');
const app        = express();
const morgan     = require('morgan');
const bodyParser = require('body-parser');

const productRoutes = require('./api/routes/products');
const orderRoutes   = require('./api/routes/orders');

// middleware
app.use(morgan('dev')); // logs incoming requests to terminal
app.use(bodyParser.urlencoded({extended: false})); // extracts HTML...?
app.use(bodyParser.json()); // extracts json data and makes it readable
app.use((req, res, next) => {  // prevents CORS errors
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

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