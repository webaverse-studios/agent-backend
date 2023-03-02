import  NeDB from '@seald-io/nedb';
import path from 'path';

export function createModel (app) {
  const Model = new NeDB({
    filename: path.join("./data", 'image-cache.db'),
    autoload: true
  });

  return Model;
};