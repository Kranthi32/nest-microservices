import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
 
@Controller()
export class UserController {
  constructor(@Inject('USER_MICROSERVICE') private readonly user_client:ClientProxy) {}    //userService: UserService
 
  //We are going to register the user details
 
  @Post('register_user')
  registerUser(@Body() userData)
  {
     const name = userData.name;
     const email = userData.email;
     const password = userData.password;
     const phone = userData.phone;
     return this.user_client.send(
        {cmd : 'register_user'},
        {name, email, password, phone},
     );
  }
}