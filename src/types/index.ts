export type ProductType = {
    id:Number;
    title:String;
    price:Number;
    description:String;
    category:String;
    image:String;
    rating:RatingType;
    isFavorite:Boolean;
};

export type RatingType = {
    rate:Number;
    count:Number;
};