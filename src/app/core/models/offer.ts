import { Property } from "./property";
import { User } from "./user";

export class Offer{
    id: number
    amount: number;
    status: string;
    user: User;
    property: Property
    createdAt: string
}