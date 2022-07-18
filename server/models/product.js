//Author: Manan Amin (B00897712)

var mongoose = require('mongoose');
const mongooseAlgolia = require('mongoose-algolia');
const algolia = require('../config/algolia-config');

var Schema = mongoose.Schema;

const NO_RATINGS = 0;
const RATINGS = [NO_RATINGS, 1, 2, 3, 4, 5];
const WOMEN = 0,
  KIDS = 1,
  MEN = 2;
const CATEGORIES = [KIDS, WOMEN, MEN];

var ProductSchema = new Schema({
  name: { type: String, required: [true, 'Missing required value - name'] },
  category: {
    type: Number,
    enum: CATEGORIES,
  },
  rating: { type: Number, default: NO_RATINGS, enum: RATINGS },
  brand: { type: String, required: [true, 'Missing required value - brand'] },
  price: { type: Number, required: [true, 'Missing required value - price'] },
  description: String,
  imageUrl: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

ProductSchema.plugin(mongooseAlgolia, {
  appId: algolia.ALGOLIA_APP_ID,
  apiKey: algolia.ALGOLIA_API_KEY,
  indexName: 'products',
  selector: '-img',
  //   debug: true,
});

var ProductModel = mongoose.model('Product', ProductSchema);

ProductModel.SyncToAlgolia();
ProductModel.SetAlgoliaSettings({
  searchableAttributes: ['name', 'description', 'brand'], //Sets the settings for this schema, see [Algolia's Index settings parameters](https://www.algolia.com/doc/api-client/javascript/settings#set-settings) for more info.
});

module.exports = ProductModel;
