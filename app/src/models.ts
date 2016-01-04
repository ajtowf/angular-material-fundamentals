/// <reference path="_all.ts" />

module ContactManagerApp {
  export class CreateUser {
    constructor(
      public firstName: string,
      public lastName: string, 
      public avatar: string, 
      public bio: string)  {      
    }
  }
  
  export class User {
    constructor(
      public name: string, 
      public avatar: string, 
      public bio: string, 
      public notes: Note[])  {      
    }
    
    static fromCreate(user: CreateUser): User {
      return new User(
        user.firstName + ' ' + user.lastName,
        user.avatar,
        user.bio,
        []);
    }
  }
  
  export class Note {
    constructor(
      public title: string, 
      public date: Date) {      
    }
  }
}