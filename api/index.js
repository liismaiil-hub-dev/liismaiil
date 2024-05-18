/* eslint-disable no-undef */

import { hostDefs } from "@/api/host/host.graphql.js";
import HostModel from "@/api/host/Host.model";
import hostResolver from "@/api/host/host.resolver";
import GuestModel from "@/api/sprint/Guest.model";
import { sprintDefs } from "@/api/sprint/sprint.graphql.js";
import SprintModel from "@/api/sprint/Sprint.model";
import sprintResolver from "@/api/sprint/sprint.resolver";
import { tabletDefs } from "@/api/tablet/tablet.graphql.js";
import tabletResolver from "@/api/tablet/tablet.resolver";
import { viewerDefs } from "@/api/viewer/viewer.graphql.js";
import ViewerModel from "@/api/viewer/Viewer.model";
import viewerResolver from "@/api/viewer/viewer.resolver";
import { ApolloServer } from "@apollo/server";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

import _lodash from "lodash";

import connectMongoose from "@/lib/mongoose-db";
//import runCoranDb from './coran/database'
import moment from "moment";
import slug from "slug";
import allowCors from "./allowCors.js";


const typesArray = [
  viewerDefs,
sprintDefs,
hostDefs,
tabletDefs
];
const resolversArray = [
  viewerResolver,
  sprintResolver,
  hostResolver,
  tabletResolver
];

// eslint-disable-next-line new-cap
const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);
//const parseOptions = { noLocation: true };
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // eslint-disable-next-line no-undef
  introspection: process.env.NODE_ENV !== "production",
  plugins: [
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
  ],
  cache: new InMemoryLRUCache({ ttl: 300_000 }),
  /* plugins: [responseCachePlugin()],
   */
  includeStacktraceInErrorResponses: true,
});
/* 
export const config = {
  api: {
    bodyParser: false,
  },
};
*/

export default allowCors(
  startServerAndCreateNextHandler(apolloServer, {
    context: async (req, res) => {
      res = NextResponse.next();

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

      const mongoose = await connectMongoose();
      return {
        path,
        fs,
        
        _lodash,
        
        slug,
        
        ViewerModel,
        GuestModel,
        SprintModel,
        HostModel,
        
        req,
        res,
        
        mongoose,
        moment,
        
      };
    },
  })
);
//export default graphqlHandler.createHandler({ path: '/api' });
