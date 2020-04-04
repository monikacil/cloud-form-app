const baseAPI = '/api';

const elementsAPI = {
  get(element) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/element/${element.email}`)
        .then(response => response.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  create(element) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/element`, {
        method: 'PUT',
        body: JSON.stringify(element),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => result.json())
        .then(json => resolve(json))
        .catch(err => {
          reject(err);
        });
    });
  },

  update(element) {
    return new Promise((resolve, reject) => {
      fetch(`${baseAPI}/element`, {
        method: 'POST',
        body: JSON.stringify(element),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
        .then(result => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  },
}

export default elementsAPI;
