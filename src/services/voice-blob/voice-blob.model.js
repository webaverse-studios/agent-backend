import fs from 'fs-blob-store'


export function createModel (app) {
    const blobStorage = fs('./uploads/voice-blob');
    return blobStorage;
};