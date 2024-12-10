import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.scss';
import './components/index.js';
import App from './views/app';
import swRegister from './utils/sw-register';
import gsap from 'gsap';

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

// Menambahkan animasi GSAP untuk hero section
gsap.from('.hero-title', { opacity: 0, y: -50, duration: 1 });
gsap.from('.hero-description', { opacity: 0, y: 30, duration: 1, delay: 0.5 });
gsap.from('.hero-buttons', { opacity: 0, y: 20, duration: 1, delay: 1 });
