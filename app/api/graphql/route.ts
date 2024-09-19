/* eslint-disable no-undef */
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { NextRequest } from "next/server";

import { registerPrisma } from "@/api/graphql/tools";
import { dbFirestore, FieldValue, timeStamp } from './fb-utils-admin';

import { guestDefs } from "@/api/graphql/guest/guest.graphql.js";
import guestResolver from "@/api/graphql/guest/guest.resolver";
//import GridModel from "@/api/graphql/sprint/Grid.model";
import { sprintDefs } from "@/api/graphql/sprint/sprint.graphql.js";
import SprintModel from "@/api/graphql/sprint/Sprint.model";
import sprintResolver from "@/api/graphql/sprint/sprint.resolver";
import { stageDefs } from "@/api/graphql/stage/stage.graphql.js";
import stageResolver from "@/api/graphql/stage/stage.resolver";
//import { tabletDefs } from "@/api/graphql/tablet/tablet.graphql.js";
//import tabletResolver from "@/api/graphql/tablet/tablet.resolver";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import fs from "fs";
import path from "path";


import _lodash from "lodash";

import connectMongoose from "@/lib/mongoose-db";
//import runCoranDb from './coran/database'
import moment from "moment";
import slug from "slug";


const typesArray = [

  sprintDefs,
  stageDefs,
  guestDefs,
  // tabletDefs
];
const resolversArray = [
  sprintResolver,
  stageResolver,
  guestResolver,
  //tabletResolver
];

// eslint-disable-next-line new-cap
const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);
//const parseOptions = { noLocation: true };
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // eslint-disable-next-line no-undef
  // introspection: process.env.NODE_ENV !== "production",
  /*  plugins: [
     {
       async serverWillStart() {
         console.log("Server starting up!");
       },
     },
     {
       async didResolveSource() {
         console.log("didResolveSource!");
       },
     },
     {
       async parsingDidStart() {
         console.log("!parsingDidStart");
       },
     },
     {
       async validationDidStart() {
         console.log("!parsingDidStart");
       },
     },
     {
       async didResolveOperation() {
         console.log("validationDidStart");
       },
     },
     {
       async responseForOperation() {
         console.log("!responseForOperation");
       },
     },
     {
       async executionDidStart() {
         console.log("!executeDidStart");
       },
     },
     {
       async didEncounterErrors(error) {
         console.log({ error });
       },
     },
     {
       async willSendResponse(response) {
         console.log({ response });
       },
     },
 
     //ApolloServerPluginCacheControl({ calculateHttpHeaders: 'if-cacheable' })
   ], */
  // cache: new InMemoryLRUCache({ ttl: 300_000 }),
  /* plugins: [responseCachePlugin()],
   */
  //includeStacktraceInErrorResponses: true,
});
/* 
export const config = {
  api: {
    bodyParser: false,
  },
};
*/


const handler = startServerAndCreateNextHandler<NextRequest>(apolloServer, {
  context: async (req: Request, res: Response) => {
    /* res = NextResponse.next();

    // add the CORS headers to the response
    res.headers.append("Access-Control-Allow-Credentials", "true");
    res.headers.append("Access-Control-Allow-Origin", "*"); // replace this your actual origin
    res.headers.append(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
    );
    res.headers.append(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
*/
    const mongoose = await connectMongoose();
    return {


      registerPrisma,
      dbFirestore,
      FieldValue,
      timeStamp,
      path,
      fs,
      _lodash,
      slug,
      SprintModel,
      //      GridModel,
      req,
      res,
      mongoose,
      moment,
    };
  },
})

//export default graphqlHandler.createHandler({ path: '/api' });
export { handler as GET, handler as POST };
