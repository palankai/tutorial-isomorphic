import axios from 'axios';


export const getFromServer = () => new Promise(async (resolve, reject) => {
  const response = await axios.get('http://localhost:8080/api/posts');
  resolve(response.data);
});

class API {
  getItems() {
    return getFromServer();
  }
}

export default API;
