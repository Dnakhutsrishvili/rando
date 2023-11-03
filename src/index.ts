import fastify from 'fastify';

const server = fastify();
import userRoute from './users/user.routes' //  here will trigger the type augmentation.

server.register(userRoute)

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})
