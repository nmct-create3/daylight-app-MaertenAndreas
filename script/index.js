import DaylightApp from './app.js'

const app = new DaylightApp(50.8027841, 3.2097454);

document.addEventListener('DOMContentLoaded', (e) => app.domLookup(e));
