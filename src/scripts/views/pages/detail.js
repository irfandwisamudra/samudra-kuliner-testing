import UrlParser from '../../routes/url-parser';
import RestaurantSource from '../../data/restaurant-source';
import { createRestaurantDetailTemplate } from '../templates/template-creator';
import LikeButtonPresenter from '../../utils/like-button-presenter';

const Detail = {
  async render() {
    return `
      <h2 class="restaurant-title">Detail Restoran</h2>
      <div id="restaurant" class="restaurant"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const restaurant = await RestaurantSource.detailRestaurant(url.id);
    const restaurantContainer = document.getElementById('restaurant');

    if (restaurant) {
      restaurantContainer.innerHTML = createRestaurantDetailTemplate(
        restaurant.restaurant
      );

      LikeButtonPresenter.init({
        likeButtonContainer: document.querySelector('#likeButtonContainer'),
        restaurant: {
          id: restaurant.restaurant.id,
          name: restaurant.restaurant.name,
          description: restaurant.restaurant.description,
          city: restaurant.restaurant.city,
          rating: restaurant.restaurant.rating,
          pictureId: restaurant.restaurant.pictureId,
        },
      });

      const reviewForm = document.getElementById('review-form');

      reviewForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const reviewText = document.getElementById('review').value;

        try {
          const result = await RestaurantSource.addReview({
            id: restaurant.restaurant.id,
            name: name,
            review: reviewText,
          });

          const reviewsList = document.getElementById('reviews-list');
          reviewsList.innerHTML = result.customerReviews
            .map(
              (review) => `
                  <li>
                    <div class="review-header">
                      <strong>${review.name}</strong>
                      <span>${review.date}</span>
                    </div>
                    <p class="review-text">${review.review}</p>
                  </li>
                `
            )
            .join('');

          reviewForm.reset();

          await RestaurantSource.detailRestaurant(url.id);
        } catch (error) {
          console.error('Failed to submit review:', error);
          alert('There was an error submitting your review.');
        }
      });
    } else {
      restaurantContainer.innerHTML = `
        <h3 class="no-data">Restoran tidak ditemukan.</h3>
      `;
    }
  },
};

export default Detail;
