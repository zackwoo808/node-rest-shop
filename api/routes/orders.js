const express = require('express');
const router = express.Router();

// handles incoming get requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were fetched',
    })
});

router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order details',
        orderId: req.params.orderId,
    })
});

// handles incoming post requests
router.post('/', (req, res, next) => {
    const order = {
        // these are extracted using bodyParser
        productId: req.body.productId,
        quantity: req.body.quantity,
    }
    res.status(201).json({
        message: 'Order was created',
        order: order,
    })
});

// handles delete requests
router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order deleted',
        orderId: req.params.orderId,
    })
});

module.exports = router;