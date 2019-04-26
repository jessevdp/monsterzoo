import { renderTemplate } from '@local/utilities';
import template from './index.template.html';

const APP_NAME = process.env.APP_NAME;
document.title = APP_NAME;
document.body.innerHTML = renderTemplate(template, { title: APP_NAME });
