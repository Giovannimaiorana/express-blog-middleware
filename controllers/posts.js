const fs = require('fs');
const path = require('path');
const posts = require("../db/db.json");
const { kebabCase } = require("lodash");



//FUNZIONE VISUALIZZAZIONE POST COMPLETI DI DETTAGLI
function index(req, res) {
    res.format({
        html: () => {
            const html = [`<h3> I miei Post </h3>`];
            html.push("<ul>")
            for (const post of posts) {
                html.push(`<li>
                <h3>${post.title}</h3>
                <img src="${post.image}" alt="${post.title}" style="width: 250px">
                <p>${post.content}</p>
                <p>Tags: ${post.tags}</p>
                </li>`)
            }
            html.push("</ul>");
            res.send(html.join(""));
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }
    })
}
//funzione per create 
function create(req, res) {
    res.format({
        html: () => {
            html = "<h1>Creazione nuovo post</h1>"
            res.send(html);
        },
        default: () => {
            res.status(406).send("Not Acceptable");
        }

    })
}
//funzione per download 
function downloadImage(req, res) {
    const postSlug = req.params.slug;

    const post = posts.find((post) => post.slug == postSlug);


    if (!post) {
        res.status(404).send(`Post ${postSlug} non trovato`);
        return;
    }


    const imagePath = path.resolve(__dirname, '..', 'public', post.image);

    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('Immagine non trovata');
            return;
        }
    })

    res.download(imagePath);


}
//funzione per store 
function store(req, res) {
    res.format({
        html: () => {
            res.send("sei finito qua")
        },
        default: () => {
            posts.push({
                ...req.body,
                slug: kebabCase(req.body.title),
                updatedAt: new Date().toISOString()
            });

            const json = JSON.stringify(posts, null, 2);

            fs.writeFileSync(path.resolve(__dirname, "..", "db", "db.json"), json)

            res.json(posts[posts.length - 1]);
        }
    })

};

//funzione per delete
function destroy(req, res) {
    res.format({
        html: () => {
            res.redirect("/");
        },
        default: () => {
            const post = findOrFail(req, res);

            const postIndex = posts.findIndex((_post) => _post.slug == post.slug);

            posts.splice(postIndex, 1);
            res.send("Post eliminato");

        }
    })
}

function findOrFail(req, res) {

    const postSlug = req.params.slug;

    const post = posts.find((post) => post.slug == postSlug);

    if (!post) {
        res.status(404).send(`Post con slug ${postSlug} non trovato!`);
        return;
    }

    return post;
}

module.exports = {
    index,
    create,
    store,
    destroy,
    downloadImage

}