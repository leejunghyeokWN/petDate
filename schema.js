import { makeExecutableSchema } from '@graphql-tools/schema';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedResovlers = loadFilesSync(`${__dirname}/**/*.resolvers.js`);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResovlers);

const schema = makeExecutableSchema({typeDefs, resolvers});

export default schema;