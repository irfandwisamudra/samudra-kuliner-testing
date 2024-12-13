import CONFIG from '../../globals/config';

const createRestaurantItemTemplate = (restaurant) => `
  <div class="restaurant-item">
    <div class="image-container">
      <img src="${
        restaurant.pictureId
          ? CONFIG.SMALL_IMAGE_URL + restaurant.pictureId
          : 'https://picsum.photos/id/666/800/450?grayscale'
      }" alt="${restaurant.name || '-'}" />
      <span class="restaurant-city"><i class="fa-solid fa-location-dot"></i> ${
        restaurant.city || '-'
      }</span>
      <div class="restaurant-rating">
        <i class="fa-solid fa-star"></i>
        <span>${restaurant.rating || '-'}</span>
      </div>
    </div>
    <div class="restaurant-info">
      <a href="#/detail/${restaurant.id}"><h3 class="restaurant__title">${
  restaurant.name || '-'
}</h3></a>
      <p>${restaurant.description || '-'}</p>
    </div>
  </div>
`;

const createRestaurantDetailTemplate = (restaurant) => {
  return `
    <div class="restaurant-detail">
      <div class="restaurant-description">
        <h2 class="restaurant__title">${restaurant.name}</h2>
        <img src="${CONFIG.MEDIUM_IMAGE_URL}${restaurant.pictureId}" alt="${
    restaurant.name
  }" />
        <ul>
          ${restaurant.categories
            .map((category) => `<li>${category.name}</li>`)
            .join('')}
        </ul>
        <p>${restaurant.description}</p>
      </div>

      <div class="restaurant-information">
        <div class="restaurant-location">
          <h3>Location:</h3>
          <p><i class="fa-solid fa-location-dot"></i> ${restaurant.address}, ${
    restaurant.city
  }</p>
        </div>

        <div class="restaurant-rating">
          <h3>Rating:</h3>
          <p><i class="fa-solid fa-star"></i> ${restaurant.rating}</p>
        </div>
      </div>

      <div class="restaurant-menu">
        <h3>Menu:</h3>
        <div class="menus">
          <div class="foods">
            <h4>Foods:</h4>
            <ul>
              ${restaurant.menus.foods
                .map((food) => `<li>${food.name}</li>`)
                .join('')}
            </ul>
          </div>
          <div class="drinks">
            <h4>Drinks:</h4>
            <ul>
              ${restaurant.menus.drinks
                .map((drink) => `<li>${drink.name}</li>`)
                .join('')}
            </ul>
          </div>
        </div>
      </div>

      <div class="restaurant-reviews">
        <h3>Customer Reviews:</h3>
        <ul id="reviews-list">
          ${restaurant.customerReviews
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
            .join('')}
        </ul>
      </div>

      <div class="add-review-form">
        <h3>Add Your Review:</h3>
        <form id="review-form" metohd="POST">
          <label for="name">Your Name:</label>
          <input type="text" id="name" name="name" required />
          
          <label for="review">Your Review:</label>
          <textarea id="review" name="review" required></textarea>
          
          <button type="submit">Submit Review</button>
        </form>
      </div>

      <div class="back-home-container">
        <a href="#/home" class="btn-back-home">
          <i class="fa-solid fa-arrow-left"></i> Back to Home
        </a>
      </div>
    </div>
  `;
};

const createLikeRestaurantButtonTemplate = () => `
  <button aria-label="like this restaurant" id="likeButton" class="like">
    <i class="fa-regular fa-heart" aria-hidden="true"></i>
  </button>
`;

const createUnlikeRestaurantButtonTemplate = () => `
  <button aria-label="unlike this restaurant" id="likeButton" class="like">
    <i class="fa-solid fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestaurantItemTemplate,
  createRestaurantDetailTemplate,
  createLikeRestaurantButtonTemplate,
  createUnlikeRestaurantButtonTemplate,
};
