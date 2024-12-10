import mongoose from "mongoose";

const historySchema = new mongoose.Schema({
    shopId: {
        type: String,
        required: true,
    },
    totalProductCount: {
        type: String,
    },
    soldProductCount: {
        type: String,
    },
    totalReviewsCount: {
        type: String,
    },
}, { timestamps: true });

const History = mongoose.model("history", historySchema);

export default History;