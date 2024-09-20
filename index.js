import express from 'express';

const app = express();
const port = 3000;

app.use(express.static("public")); //middleware include static file

app.use(express.urlencoded({extended : true})); //middleware

let posts = [];

app.listen(port, () => {
    console.log("listening on port " + port);
});

app.get('/', (req, res) => {
    res.render('index.ejs', { posts });
});

app.get('/create', (req, res) => {
    res.render('create.ejs');
});

app.get('/about', (req, res) => {
    res.render('about.ejs');
});


app.post('/posts', (req, res) => {
    const { title, content } = req.body;

    const newPost = { id: posts.length + 1, title, content };

    posts.push(newPost);

    res.redirect('/');


});


app.get('/post/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id, 10));

    if (post) {
        res.render('detail.ejs', { post});
    } else {
        res.status(404).send('post not found');
    }
});


app.get('/edit/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    res.render('edit.ejs', { post });
});

app.post('/edit/:id', (req, res) => {
    const { title, content } = req.body;

    const post = posts.find(p => p.id === parseInt(req.params.id));

    if (post) {
        post.title = title;
        post.content = content;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found')
    }
});


app.get('/delete/:id', (req, res) => {
    posts = posts.filter(p => p.id !== parseInt(req.params.id));
    res.redirect('/');
})
