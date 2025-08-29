export const dynamic ="force-dynamic";

export async function POST(req) {
    try {
        const reqData = await req.json();

        if (!ReqData.productId) 
            return Response.json(
            { message: "An rroer occured"},
            { status: 400} 
         );                
    } catch (error) {
        console.error(error);
        Response.json({ message: "An rroer occured"}, { status: 500});    
    }    
}