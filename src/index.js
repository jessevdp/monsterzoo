import App from '@local/app/App';

const APP_NAME = process.env.APP_NAME;
document.title = APP_NAME;

const app = new App(APP_NAME);
document.body.innerHTML = app.render();
window.setTimeout(() => app.name = `Updated ${APP_NAME}`, 2000);
