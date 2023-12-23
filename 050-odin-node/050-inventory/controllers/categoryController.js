const Category = require('../models/category');
const Item = require('../models/item');
const asyncHandler = require('express-async-handler');

exports.index = asyncHandler(async (req, res, next) => {
    // exec gives back promise
    const categories = await Category.find({}, 'name').sort({ name: 1 }).exec();

    res.render('index', {
        title: 'Categories',
        categories: categories,
    });
});

exports.detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findOne({ _id: req.params.id }).exec();
    const items = await Item.find({ category: req.params.id }, 'name').sort({ name: 1 }).exec();

    res.render('category_detail', {
        title: "Category Detail",
        category: category,
        items: items,
    });
});