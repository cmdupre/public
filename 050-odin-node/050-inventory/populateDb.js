#! /usr/bin/env node

console.log('populating db with test categories and items...');

const Category = require("./models/category");
const Item = require("./models/item");

const categories = [];
const items = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.CONNECTION_STRING;

main().catch((err) => console.log(err));

async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// category[0] will always be the Light category, regardless of the order
// in which the elements of promise.all's argument complete.
async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
}

async function itemCreate(index, name, description, category, numberInStock, price) {
    const item = new Item({ name, description, category, price, numberInStock });
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
}

async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
        categoryCreate(0, "Light", "Low-calorie for daily consumption"),
        categoryCreate(1, "Regular", "Full-bodied taste"),
        categoryCreate(2, "IPA", "Rich with hops"),
        categoryCreate(3, "Amber", "Some people actually like these"),
        categoryCreate(4, "Stout", "Delicious, perhaps even chewable"),
        categoryCreate(5, "Sour", "Summer fresh"),
    ]);
}

async function createItems() {
    console.log("Adding items");
    await Promise.all([
        itemCreate(0, "Miller Lite", "A fine pilsner beer", categories[0], 1, 199),
        itemCreate(1, "Coors Light", "Better than bud-light", categories[0], 2, 99),
        itemCreate(2, "Budweiser", "Some useless regular beer", categories[1], 3, 1),
        itemCreate(3, "Busch", "Good luck with this one", categories[1], 4, 1),
        itemCreate(4, "Holy Roller", "Urban South", categories[2], 5, 299),
        itemCreate(5, "Voodoo Ranger", "New Belgium", categories[2], 6, 299),
        itemCreate(6, "Abita Amber", "Abita - only decent amber", categories[3], 7, 99),
        itemCreate(7, "Fat Tire", "New Belgium - ok, not that bad", categories[3], 8, 99),
        itemCreate(8, "Guinness Stout", "Need I say more?", categories[4], 9, 399),
        itemCreate(9, "Wild Little Thing", "Sierra Nevada", categories[5], 1, 499),
    ]);
}