const express = require('express');
const router  = express.Router();

// handles incoming get requests
router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products',
    })
});

// handles incoming post requests
router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Handling POST requests to /products',
    })
});

// express uses :variableName for variables
router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id,
        });
    }
    else {
        res.status(200).json({
            message: 'You passed an ID',
        });
    }
});

// handles incoming update requests
router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!',
    })
});

// handles incoming post requests
router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!',
    })
});

module.exports = router;