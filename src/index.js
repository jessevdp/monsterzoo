import Title from '@local/app/components/title';

const APP_NAME = process.env.APP_NAME;
document.title = APP_NAME;

const title = new Title(APP_NAME);
document.body.innerHTML = title.render();
