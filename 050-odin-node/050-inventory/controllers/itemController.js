const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findOne({ _id: req.params.id }).exec();

    res.render('item_detail', {
        title: "Item Detail",
        item: item,
    });
});