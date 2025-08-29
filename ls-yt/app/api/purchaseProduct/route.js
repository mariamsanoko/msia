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
                            id: "2"
                    },
                },
                variant: {
                    data: {
                        type: "variants",
                        id: "2",
                    },
                },
            },
        },
    });
    } catch (error) {
        console.error(error);
        Response.json({ message: "An rroer occured"}, { status: 500});    
    }    
}