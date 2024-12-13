const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.see('Tidak ada restoran untuk ditampilkan.', '.no-data');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan.', '.no-data');

  I.amOnPage('/');

  I.seeElement('.restaurant-info a');
  const firstRestaurant = locate('.restaurant-info a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.restaurant-item');
  const likedRestaurantTitle = await I.grabTextFrom('.restaurant__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan.', '.no-data');

  I.amOnPage('/');

  I.seeElement('.restaurant-info a');

  const titles = [];
  for (let i = 1; i <= 3; i++) {
    I.click(locate('.restaurant-info a').at(i));

    I.seeElement('#likeButton');
    I.click('#likeButton');

    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.restaurant__title'));

    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements(
    '.restaurant-item'
  );
  assert.strictEqual(titles.length, visibleLikedRestaurants);

  const searchQuery = titles[1].substring(1, 3);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  // mendapatkan daftar restoran yang sesuai dengan searchQuery
  const matchingRestaurants = titles.filter(
    (title) => title.indexOf(searchQuery) !== -1
  );
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements(
    '.restaurant-item'
  );

  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);

  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop
    const visibleTitle = await I.grabTextFrom(
      locate('.restaurant__title').at(i + 1)
    );

    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});
