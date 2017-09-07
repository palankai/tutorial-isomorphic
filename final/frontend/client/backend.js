import axios from 'axios';


class Backend {

  getItems() {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get('http://localhost:8080/api/records/');
      setTimeout(function() {
        resolve(response.data);
      }, 3000);
    });
  }

}

export const backend = new Backend();
