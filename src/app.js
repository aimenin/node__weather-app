const path = require('path'); // библиотека, которая позволяет манипулировать путем 

const express = require('express'); // по сути експресс - это одна функция, которая создает экспресс приложение 
const hbs = require('hbs'); // библиотке для создания live-tmplates

const utils = require('./utils/geocode');

const app = express(); // создаем экспресс приложение
const port = process.env.PORT || 3000; // запускаем приложение на определнном порте, если оно выложено, или на порте 3000 если оно в разработке

// Определяем пути для Express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Устанавливаем handlebars engine и папку, где будут храниться views
app.set('view engine', 'hbs'); // фукция set определяет настройки express
app.set('views', viewsPath);
hbs.registerPartials(partialsPath); // функция которая определяет что у нас в проекте будут partials

// Устанавливаем статическую папку
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Artem Imenin'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Artem Imenin'    
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Call us for help',
        name: 'Artem Imenin'
    })
})

// функция создает определенный раут
app.get('/weather', async (req, res) => {
    if (!req.query.address) {
        return res.send({
            errorMessage: "You must provide an adress"
        });
    }

    try {
        const { forecast, place, error, pressure } = await utils.currentlyWeather(req.query.address);
        res.send({
            forecast,
            place,
            address: req.query.address,
            pressure,
            error
        });
    } catch (e) {
        console.log('Cant get the server')
    }
});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            errorMessage: 'You must provide a search term'
        });
    }

    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Error page",
        name: 'Artem Imenin',
        errorMessage: 'Help page not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "Error page",
        name: 'Artem Imenin',
        errorMessage: 'Page not found'
    });
});

app.listen(port, () => {
    console.log('Server is up on port 3000.');
});

