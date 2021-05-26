const Post = require('../models/post');
const slugify = require('slugify');



exports.create = (req, res) => {

    const { title, content, user } = req.body
    const slug = slugify(title)

    // validate

    switch(true){
        case !title:
            return res.status(400).json({
                error: 'Title is required'
            });
            break;
        
        case !content:
            return res.status(400).json({
                error: 'Content is required'
            });
            break;
    }

    // Create post
    Post.create({ title, content, user, slug }, (err, post) => {
        if(err){
            console.log(err)
            res.status(400).json({
                error: 'Duplicate post. Try another title'
            });
        }

        res.json(post);
    })

    // if(!title || !content){
    //     return res.status(400).json({
    //         error: 'Title and content are required'
    //     });
    // }
}

exports.list = (req, res) => {
    Post.find({})
    .limit(10)
    .sort({createdAt: -1})
    .exec((err, posts) => {
        if(err) console.log(err)

        res.json(posts);
    })

}

exports.read = (req, res) => {
    const { slug } = req.params
    console.log(req.params.slug)

    Post.findOne({slug})
    .exec((err, post) => {
        if(err) console.log(err)

        res.json(post);
    })
}

exports.update = (req, res) => {
    const { slug } = req.params;
    const { title, content, user } = req.body;
    Post.findOneAndUpdate({ slug }, { title, content, user }, {new: true})  // 1.on the basis of what 2. what to update 3. returns updated post

    .exec( (err, post) => {
        if(err) console.log(err)
        res.json(post);
    })
}

exports.remove = (req, res) => {
    const { slug } = req.params
    console.log(req.params.slug)

    Post.findOneAndRemove({slug})
    .exec((err, post) => {
        if(err) console.log(err)

        res.json({
            message: 'Post deleted'
        });
    })
}