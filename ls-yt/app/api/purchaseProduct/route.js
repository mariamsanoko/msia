import { lemonSqueezyApiInstance } from "@/utils/axios";

export const dynamic ="force-dynamic";

export async function POST(req) {
    try {
        const reqData = await req.json();

        if (!reqData.productId) 
            return Response.json(
            { message: "product ID is required" },
            { status: 400} 
         );     
        
        const response  = await lemonSqueezyApiInstance.post("/checkout", {
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

    console.log(response.data);
    
    } catch (error) {
        console.error(error);
        Response.json({ message: "An rroer occured"}, { status: 500});    
    }    
}