
import { faker } from '@faker-js/faker';
import { connect } from 'mongoose';
import User from './user.modules';


export default async function run() {
    await connect('mongodb://127.0.0.1:27017/chat');
  
    const user = new User({
      name: faker.animal.fish(),
    });
    await user.save();
  
    console.log(user.name); // 'bill@initech.com'
  }
  