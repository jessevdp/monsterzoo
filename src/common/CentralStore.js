import { Component } from '@local/system';

class CentralStore extends Component {}

const centralStore = window.CentralStore = new CentralStore();

export default centralStore;