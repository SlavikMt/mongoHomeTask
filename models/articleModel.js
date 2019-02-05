const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    _id: Schema.Types.ObjectId,
    title: { type: String, min: 5, max: 400, required: true },
    subtitle: { type: String, min: 5 },
    description: { type: String, min: 5, max: 5000, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, enum: ['sport', 'games', 'history'], required: true },
    createdAt: { type: Date },
    updatedAt: { type: Date },

}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
    }
})

module.exports = mongoose.model('Article', ArticleSchema)