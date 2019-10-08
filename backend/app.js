const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Post = require('./models/post');

mongoose.connect("mongodb+srv://shubham:iu0kdqocQEKesZEP@cluster0-as4ub.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('Succesfully connected to Mongo');
}).catch(err => {
    console.log('Error while connecting to Mongo', err);
})

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, PATCH, DELETE, OPTIONS, PUT');
    next();
});

app.route("/api/posts").post((req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content,
    });
    post.save().then(saved => {
        console.log('ID', saved)
        res.status(201).json({
            message: 'Post API successfully called',
            id: saved._id,
        })
    })

}).get((req, res, next) => {
    Post.find().then(documents => {
        console.log('Data fetch from Mongo', documents);
        res.status(200).json({
            message: 'Posts fetch',
            posts: documents,
        })
    });
})


app.route("/api/posts/:postId").delete((req, res) => {
    const postID = req.params.postId
    console.log('Post delete ID', postID)
    Post.deleteOne({ _id: postID }).then(result => {
        res.status(200).json({
            message: 'Successfully trying to delete'
        })
    })
}).put((req, res) => {
    const postID = req.params.postId
    const post = new Post({
        _id: postID,
        title: req.body.title,
        content: req.body.content,
    })
    Post.updateOne({ _id: postID }, post).then(result => {
        res.status(201).json({
            message: "Successfully updated"
        })
    })
})



module.exports = app;