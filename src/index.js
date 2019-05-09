import App from './App';

const app = new App(process.env.APP_NAME);
document.body.innerHTML = app.render();

window.setTimeout(() => {
    app.name = 'Updated ' + process.env.APP_NAME;
}, 2000);
