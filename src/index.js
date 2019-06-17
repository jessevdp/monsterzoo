import App from './App';
import WeatherAPI from './common/WeatherAPI';
console.log(WeatherAPI);

const app = window.app = new App();
document.body.innerHTML = app.render();
