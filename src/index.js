import App from './App';

document.title = process.env.APP_NAME;

const app = new App();
document.body.innerHTML = app.render();
