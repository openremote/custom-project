import rest from "@openremote/rest";


export class RestApi {

    get api() {
        return rest.api;
    }
}

export default new RestApi();
