import App from './App';
import config from './config';

const app = new App(config.app.name);
document.body.innerHTML = app.render();

window.setTimeout(() => {
    app.name = 'Updated ' + config.app.name;
}, 2000);
