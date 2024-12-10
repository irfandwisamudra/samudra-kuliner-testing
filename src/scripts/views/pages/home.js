import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <h2 class="restaurant-title">Daftar Restoran</h2>
      <div id="restaurants" class="restaurants"></div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantContainer = document.getElementById('restaurants');

    if (restaurants && restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantContainer.innerHTML = `
        <h3 class="no-data">Tidak ada restoran untuk ditampilkan.</h3>
      `;
    }
  },
};

export default Home;
