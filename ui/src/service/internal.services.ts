import Service from ".";
import { Connections } from "../constants/connections";

const internalAPI = new Service(Connections.InternalAPI)

export default internalAPI