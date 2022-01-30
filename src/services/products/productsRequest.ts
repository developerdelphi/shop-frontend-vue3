import Api from '../api';

async function getProducts() {
  try {
    await Api.get('api/products').then((response) => {
      console.log(response.data);
    });
  } catch (error) {
    console.error(error.response.data);
  }
}

export { getProducts };
