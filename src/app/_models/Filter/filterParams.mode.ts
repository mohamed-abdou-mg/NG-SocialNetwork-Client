import { AuthResponse } from "../Authentication/Responses/auth-response.model";

export class FilterParams{
    minAge: number = 18;
    maxAge: number = 60;
    gender: string;
    pageNumber: number = 1;
    pageSize: number = 8;
    orderBy: string = 'lastActive';
    constructor(authUser: AuthResponse){
        this.gender = authUser.gender == "male" ? "female" : "male";
    }
}