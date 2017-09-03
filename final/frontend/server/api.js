const DATA = {
  entries: [
    {
      id: 'ADR-0001',
      title: 'Sample Decision',
      excerpt: `Cum sociis natoque penatibus et magnis nascetur ridiculus mus.
              Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
              vestibulum. Sed posuere consectetur est at lobortis.
              Cras mattis consectetur purus sit amet fermentum.`,
      context: `Cum sociis natoque penatibus et magnis nascetur ridiculus mus.
              Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
              vestibulum. Sed posuere consectetur est at lobortis.
              Cras mattis consectetur purus sit amet fermentum.`,
      conclusion: `Cum sociis natoque penatibus et magnis nascetur ridiculus mus.
              Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis
              vestibulum. Sed posuere consectetur est at lobortis.
              Cras mattis consectetur purus sit amet fermentum.`
    }
  ],
  total: 1,
  page: 1,
  limit: 5
};


export class API {

  getADREntries() {
    return new Promise(((resolve, reject) => {
      resolve(DATA);
    }));
  }

  getADREntry(id) {
    return new Promise(((resolve, reject) => {
      resolve(DATA.entries[0]);
    }));

  }
}
