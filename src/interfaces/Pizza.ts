export interface Pizza {
    _id: number;
    image_url: string;
    name: string;
    ingredients: string[];
    sold_out: boolean;
    unit_price: number;
}