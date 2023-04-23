let express = require('express');
let app = express();
let fs = require('fs');

// Moteur de template
app.set('view engine', 'ejs');

// Middelware, static précise quel est le dossier qui distribue les fichiers static
app.use('/static', express.static('static'));

// Route page index
app.get('/', (request, response) => {
response.render('pages/index');
});

// Route page article, qui contient un paramètre ":id"
app.get('/article/:id', (request, response) => {

    // Lit le contenu synchrone du fichier 'articles.json' et stocke dans la var 'json'
    let json = fs.readFileSync('data/articles.json');

    //Convertie le contenu du fichier "articles.json", qui est une chaîne de caractères, en un objet JSON (c'est nécessaire car le fichier "articles.json" est stocké en tant que chaîne de caractères, et pour extraire les données de l'article, il est nécessaire de le convertir en un objet JSON.)
    let jsonData = JSON.parse(json);

    //Affiche dans la console la longueur de l'objet "jsonData"
    console.log(jsonData.length);

    //Extrait l'identifiant de l'article à partir des paramètres de l'URL et convertit en un entier
    const id = parseInt(request.params.id)

    //Conditions :
    if(id > jsonData.length || id < 1){
        response.status(404).send('Page indisponible :(')
    }
    else {
        // Lecture synchrone du contenu du fichier "articles.json" se trouvant dans le dossier "data"
        let rawdata = fs.readFileSync('data/articles.json');

        // Convertit le contenu du fichier lu en objet.
        let data = JSON.parse(rawdata);

        // Récupère l'article avec l'id correspondant à celui demandé par l'utilisateur
        const articles = data.find(data => data.id === id);

        // Affiche la page d'article qui correspond avec les infos de l'article
        response.render('pages/article', {articles});

        // Affiche les infos de l'article dans la console
        console.log(articles);
      }
})
app.listen(3030)