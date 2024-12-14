import RestaurantSource from '../../data/restaurant-source';
import {
  createRestaurantItemTemplate,
  createSkeletonRestaurantTemplate,
} from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <h2 class="restaurant-title">Daftar Restoran</h2>
      <div id="restaurants" class="restaurants">
        ${createSkeletonRestaurantTemplate(20)}
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.listRestaurants();
    const restaurantsContainer = document.getElementById('restaurants');

    restaurantsContainer.innerHTML = '';
    if (restaurants && restaurants.length > 0) {
      restaurants.forEach((restaurant) => {
        restaurantsContainer.innerHTML +=
          createRestaurantItemTemplate(restaurant);
      });
    } else {
      restaurantsContainer.innerHTML = `
        <h3 class="no-data">Tidak ada restoran untuk ditampilkan.</h3>
      `;
    }
  },
};

export default Home;
