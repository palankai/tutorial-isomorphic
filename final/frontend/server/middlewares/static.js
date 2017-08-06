import express from 'express';


export default function configure(app, config) {
  app.use(express.static(config.path.build));
};
