const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({

    Press_Clipping_Index_No : String,
    caption: String,
    source: String,
    language: String,
    keywords: String,
    url_link: String,
    date:String,
    image: String,
    
});

const Post = mongoose.model('Clip', PostSchema);

module.exports = Post;