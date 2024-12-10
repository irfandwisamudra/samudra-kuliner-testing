import DrawerInitiator from '../utils/drawer-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';

class App {
  constructor({ button, drawer, closeDrawer, menuItems, content }) {
    this._button = button;
    this._drawer = drawer;
    this._closeDrawer = closeDrawer;
    this._menuItems = menuItems;
    this._content = content;

    this._initialAppShell();
  }

  _initialAppShell() {
    DrawerInitiator.init({
      button: this._button,
      drawer: this._drawer,
      closeDrawer: this._closeDrawer,
      menuItems: this._menuItems,
      content: this._content,
    });
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    const page = routes[url];
    this._content.innerHTML = await page.render();
    await page.afterRender();

    const skipLink = document.querySelector('.skip-link');
    const mainContent = document.querySelector('#mainContent');

    skipLink.addEventListener('click', (e) => {
      e.preventDefault();

      mainContent.scrollIntoView({ behavior: 'smooth' });
      mainContent.focus();
      skipLink.blur();
    });
  }
}

export default App;
