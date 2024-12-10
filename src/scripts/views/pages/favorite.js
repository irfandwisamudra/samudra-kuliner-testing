import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Favorite = {
  async render() {
    return `
      <h2 class="restaurant-title">Restoran Favorit</h2>
      <div id="restaurants" class="restaurants"></div>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();
    const restaurantContainer = document.getElementById('restaurants');

    if (restaurants && restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantContainer.innerHTML = `
        <h3 class="no-data">Belum ada restoran yang ditambahkan ke favorit.</h3>
      `;
    }
  },
};

export default Favorite;
