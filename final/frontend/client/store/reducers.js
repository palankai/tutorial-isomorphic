import loremIpsum from 'lorem-ipsum';


const initialState = {
  index: {
    items: [
      {
        id: 'ADR-0001',
        title: loremIpsum({count: 3, units: 'words'}),
        excerpt: loremIpsum({count: 1, units: 'paragraph'})
      },
      {
        id: 'ADR-0002',
        title: loremIpsum({count: 3, units: 'words'}),
        excerpt: loremIpsum({count: 1, units: 'paragraph'})
      }
    ]
  }
};


function rootReducer(state = initialState, action) {
  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}


export default rootReducer;
