import { renderTemplate } from '@/utilities';
import template from './index.template.html';
import './index.scss';

const APP_NAME = process.env.APP_NAME;
document.title = APP_NAME;
document.body.innerHTML = renderTemplate(template, { title: APP_NAME });
