import axios from 'axios';


export const getFromServer = () => {
  return new Promise(async (resolve, reject) => {
    const response = await axios.get('http://localhost:8080/api/posts');
    resolve(response.data);
  });

};
