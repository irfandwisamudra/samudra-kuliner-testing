import API_ENDPOINT from '../globals/api-endpoint';
import Swal from 'sweetalert2';

class RestaurantSource {
  static async listRestaurants() {
    try {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(API_ENDPOINT.LIST);
      if (!response.ok) {
        throw new Error('Failed to fetch restaurants');
      }

      const responseJson = await response.json();

      Swal.close();
      return responseJson.restaurants;
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'An error occurred while fetching restaurants.',
      });
      throw error;
    }
  }

  static async detailRestaurant(id) {
    try {
      Swal.fire({
        title: 'Loading...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(API_ENDPOINT.DETAIL(id));
      if (!response.ok) {
        throw new Error('Failed to fetch restaurant details');
      }

      const responseJson = await response.json();

      Swal.close();
      return responseJson;
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
          error.message ||
          'An error occurred while fetching restaurant details.',
      });
      throw error;
    }
  }

  static async searchRestaurants(query) {
    try {
      Swal.fire({
        title: 'Searching...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(API_ENDPOINT.SEARCH(query));
      if (!response.ok) {
        throw new Error('Failed to search for restaurants');
      }

      const responseJson = await response.json();

      Swal.close();
      return responseJson.restaurants;
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
          error.message || 'An error occurred while searching for restaurants.',
      });
      throw error;
    }
  }

  static async addReview(review) {
    try {
      Swal.fire({
        title: 'Submitting review...',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await fetch(API_ENDPOINT.ADD_REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(review),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const responseJson = await response.json();

      Swal.close();
      return responseJson;
    } catch (error) {
      Swal.close();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text:
          error.message || 'An error occurred while submitting your review.',
      });
      throw error;
    }
  }

  static async smallImage(imageName) {
    return `${API_ENDPOINT.SMALL_IMAGE_URL}${imageName}`;
  }

  static async mediumImage(imageName) {
    return `${API_ENDPOINT.MEDIUM_IMAGE_URL}${imageName}`;
  }

  static async largeImage(imageName) {
    return `${API_ENDPOINT.LARGE_IMAGE_URL}${imageName}`;
  }
}

export default RestaurantSource;
