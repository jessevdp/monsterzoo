import App from './App';
import config from './config';

document.title = config.app.name;

const app = new App();
document.body.innerHTML = app.render();
