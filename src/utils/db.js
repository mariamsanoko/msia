export const products = [
    {
        name:'Basic Starter Pack',
        price:'399',
        inStock:'12',
    },
    {
        id:2,
        name:'Pink blouse',
        price:'1490',
        inStock:'2',
    },
     {
        id:3,
        name:'Prenium Suit',
        price:'1490',
        inStock:'10',
    },
     {
        id:4,
        name:'IPhone',
        price:'1500',
        inStock:'22',
    },
];

export const listProducts = () => {
     return products;
};

 export const purchaseProduct= (id, quantity) => {
    const [product] = products.filter((product) => product.
    id === parseInt(id));
    if(product.inStock > 0 && product.inStock >= quantity) {
        product.inStock -= quantity;
    } else {
        product.inStock = 0;
    }
    return products;
};
 