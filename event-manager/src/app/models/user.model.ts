import { Injectable } from '@angular/core';
import { Adapter } from './adapter';

export class User {
  constructor(
    public id: number,
    public name: string,
    public email: string,
    public username: string
  ) { }
}

@Injectable()
export class UserAdapter implements Adapter<User>{

  adapt(item: any): User {
    return new User(item.id
      , item.name
      , item.email
      , item.username
    );
  }
}

export function sortUser(e1: User, e2: User): number{
    var nameA = e1.name.toUpperCase();
    var nameB = e2.name.toUpperCase(); 
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0; 
  }
  

