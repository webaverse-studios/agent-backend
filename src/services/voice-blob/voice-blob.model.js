import fs from 'fs-blob-store'
import NeDB from "@seald-io/nedb";
import path from "path";


export function createModel (app) {
    const blobStorage = fs('./uploads');
    return blobStorage;
};