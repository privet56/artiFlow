/**
 * artiFlow REST API Definition
 * artiFlow REST API Definition
 *
 * OpenAPI spec version: 1.0.0
 * Contact: privet56@hotmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { ConfigurationEntry } from './configurationEntry';


export interface Configuration {
    name: string;
    time: Date;
    requestURL: string;
    entries: Array<ConfigurationEntry>;
}
