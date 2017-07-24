export default class API {
  getItems() {
    return new Promise(((resolve, reject) => {
      resolve({
        items: [
          { id: 1,
            content: 'HELLO'
          },
          { id: 2,
            content: 'REACT'
          },
          { id: 3,
            content: 'WORLD'
          }
        ] }
      );
    }));
  }
}
