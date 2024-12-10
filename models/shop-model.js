import mongoose from "mongoose";

const shopSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    url: {
        type: String,
    },
}, { timestamps: true });

const Shop = mongoose.model("shop", shopSchema);

export default Shop;