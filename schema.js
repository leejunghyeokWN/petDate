import {loadFileSync} from "graphql-tools";

const loadedTypes = loadFileSync('${__dirname}/**/*.typeDefs.js');