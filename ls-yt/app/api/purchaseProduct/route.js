import { lemonsqueezyApiInstance } from "../../utils/axios";

export const dynamic = "force-dynamic";

export async function POST(req) {
    try {
        const reqData = await req.json();

        if (!reqData.productId) 
            return Response.json(
            { message: "productId is required" },
            { status: 400} 
         );     
        
        const response  = await lemonsqueezyApiInstance.post("/checkouts", {
            data: {
                type: "checkouts",
                relationships: {
                    store: {
                        data: {
                            type: "stores",
                            id: process.env.LEMON_SQUEEZY_STORE_ID.toString(),
                        },
                    },
                    variant: {
                    data: {
                        type: "variants",
                        id: reqData.productId.toString(),
                    },
                },
            },
        },
    });
    const checkoutUrl = response.data.data.attributes.url;

    console.log(response.data);
    return Response.json({ checkoutUrl })
    } catch (error) {
        console.error(error);
        Response.json({ message: "An error occured" }, { status: 500});    
    }    
}