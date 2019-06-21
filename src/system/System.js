import Component from './Component';
import renderTemplate  from './renderTemplate';
import EventBus from './EventBus';

const System = {
    Component,

    renderTemplate,
    EventBus: new EventBus(),
};

export default System;
