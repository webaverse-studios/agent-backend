import  NeDB from '@seald-io/nedb';
import path from 'path';

export function createModel (app) {
    // const dbPath = app.get('nedb');
    const Model = new NeDB({
        filename: path.join("./data", 'voice-cache.db'),
        autoload: true
    });

    return Model;
};