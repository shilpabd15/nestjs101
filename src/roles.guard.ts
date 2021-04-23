import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ForbiddenException } from './cats/cats.controller';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {

    const user={
      name: "gojo",
      roles:["user"],
    }

    const roles= this.reflector.get<string>("roles", context.getHandler());

    console.log(roles);

    if(!roles){
      return true;
    }

    const requiredRoles="admin";

    if(!roles.includes(requiredRoles)){
      throw new ForbiddenException();
    }
    return true;
  }
}
