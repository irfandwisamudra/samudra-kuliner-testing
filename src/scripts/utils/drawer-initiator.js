const DrawerInitiator = {
  init({ button, drawer, closeDrawer, menuItems, content }) {
    button.addEventListener('click', (event) => {
      this._toggleDrawer(event, drawer);
    });

    closeDrawer.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    content.addEventListener('click', (event) => {
      this._closeDrawer(event, drawer);
    });

    this._closeDrawerOnMenuItemClick(menuItems, drawer);

    this._handleResize(drawer);

    this._closeDrawerOnOutsideClick(drawer);
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.toggle('active');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  },

  _closeDrawerOnMenuItemClick(menuItems, drawer) {
    menuItems.forEach((menuItem) => {
      menuItem.addEventListener('click', (event) => {
        this._closeDrawer(event, drawer);
      });
    });
  },

  _handleResize(drawer) {
    const mediaQuery = window.matchMedia('(min-width: 768px)');

    const closeDrawerOnResize = () => {
      if (mediaQuery.matches) {
        drawer.classList.remove('active');
      }
    };

    mediaQuery.addEventListener('change', closeDrawerOnResize);
    closeDrawerOnResize();
  },

  _closeDrawerOnOutsideClick(drawer) {
    document.addEventListener('click', (event) => {
      if (
        drawer.classList.contains('active') &&
        !drawer.contains(event.target)
      ) {
        this._closeDrawer(event, drawer);
      }
    });
  },
};

export default DrawerInitiator;
