import Service from ".";
import { EConnections } from "../constants/connections";

const isProd = process.env.REACT_APP_SKILLHUB_PROD;
const internalAPI = new Service(isProd ? EConnections.ProdApi : EConnections.InternalAPI  )

export default internalAPI