import fastify from 'fastify';
const server = fastify();
import run from './user.controller';


server.get("/login", async(request, reply)=>{
    run().catch(err => console.log(err));
    console.log("login")    
  });