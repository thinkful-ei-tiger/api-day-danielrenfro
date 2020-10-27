const BASE_URL = 'https://thinkful-list-api.herokuapp.com/danielrenfro';

/**
 * listApiFetch - Wrapper function for native `fetch` to standardize error handling. 
 * @param {string} url 
 * @param {object} options 
 * @returns {Promise} - resolve on all 2xx responses with JSON body
 *                    - reject on non-2xx and non-JSON response with 
 *                      Object { code: Number, message: String }
 */

 const listApiFetch = function (...args) {
   let error;
   return fetch(...args)
    .then (response => {
      if (!response.ok) {
        error = {code: response.status};

        if (!response.headers.get('content-type').includes('json')) {
          error.message = response.statusText;
          return Promise.reject(error);
        }
      }

      return response.json();
    })
    .then(data => {
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }
      return data;
    });
 };

function getItems() {
  return listApiFetch(`${BASE_URL}/items`);
}

function createItem(name) {
  let newItem = JSON.stringify({ name })

  return listApiFetch(`${BASE_URL}/items`, 
  {
    method:'POST',
    headers: {'Content-Type': 'application/json'},
    body: newItem
  });
};

function updateItem(id, updateData) {
  const newData = JSON.stringify(updateData);
  return listApiFetch(`${BASE_URL}/items/${id}`, 
  {
    method: 'PATCH',
    headers: {'Content-Type': 'application/json'},
    body: newData
  });
};

function deleteItem(id) {
  return listApiFetch(`${BASE_URL}/items/${id}`, 
  {
    method: 'DELETE'
  });
};

export default {
  getItems,
  createItem,
  updateItem,
  deleteItem
};