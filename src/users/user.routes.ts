import run from './user.controller';

function userRoutes (fastify,options,done){

  fastify.get("/login", async(request, reply)=>{
    run().catch(err => console.log(err));
    console.log("login")    
  });

  fastify.post("/chat", async(request, reply)=>{
    console.log("user entered chat")    
  });

  done()
}

export default userRoutes;