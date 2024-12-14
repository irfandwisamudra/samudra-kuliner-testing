import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import './components/index.js';
import App from './views/app';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

document.addEventListener('DOMContentLoaded', () => {
  const drawerToggle = document.getElementById('drawer-toggle');
  const navigationDrawer = document.getElementById('navigation-drawer');
  const closeDrawer = document.getElementById('close-drawer');
  const menuItems = document.querySelectorAll('.drawer-links a');
  const content = document.getElementById('mainContent');

  const app = new App({
    button: drawerToggle,
    drawer: navigationDrawer,
    closeDrawer: closeDrawer,
    menuItems: menuItems,
    content: content,
  });

  window.addEventListener('hashchange', () => {
    app.renderPage();
  });

  window.addEventListener('load', () => {
    app.renderPage();
    swRegister();
  });
});
