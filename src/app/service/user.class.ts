export class User {
    constructor(public id: number, public job: string) {}
  }
  
  export interface IUserResponse {
    results: User[];
  }