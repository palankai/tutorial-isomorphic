import axios from 'axios';


class Backend {

  getItems() {
    return new Promise(async (resolve, reject) => {
      const response = await axios.get('http://localhost:8080/api/records/');
      resolve(response.data);
    });
  }

}

export const backend = new Backend();
