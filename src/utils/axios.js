import axios from "axios";

export const LEMON_SQUEEZY_ENDPOINT = "https;//api.lemonsqueezy.com/v1/";

export const lemonsqueezyApiInstace = axios.create({
   baseURL: LEMON_SQUEEZY_ENDPOINT,
   headers: {
    Accept: "application/vnd.api+json",
    "Content-type": "application/vnd.api+json",
    Authorization:'Bear ${process.env.LEMON_SQUEEZY_API_KEY}',
   },

});
