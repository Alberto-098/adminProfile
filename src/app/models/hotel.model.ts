import { room } from './room.model';
export interface hotel {
    id: number;
    name: string;
    description: string;
    location: string;
    image: string;
    rooms?: Array<room>
}