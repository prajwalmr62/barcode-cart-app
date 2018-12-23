import { IMedia } from './media.interface';

export interface IProduct{

    name: string;

    id: string;

    media: IMedia;

    price: {
        value: number;
        unit: string;
    }
}