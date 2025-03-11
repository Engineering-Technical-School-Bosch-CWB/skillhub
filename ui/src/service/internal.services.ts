import Service from ".";
import { EConnections } from "../constants/connections";

const isProd = process.env.NODE_ENV;

let internalAPI: Service;
if(isProd === "production") {
    internalAPI = new Service(EConnections.ProdApi)
} else {
    internalAPI = new Service(EConnections.InternalAPI)
}

export default internalAPI