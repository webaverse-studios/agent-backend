import fs from "fs-blob-store";


export function createModel (app) {
    return fs('./uploads/voice-blob');
};