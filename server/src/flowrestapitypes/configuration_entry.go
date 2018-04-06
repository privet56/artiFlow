/*
 * artiFlow REST API Definition
 *
 * artiFlow REST API Definition
 *
 * API version: 1.0.0
 * Contact: privet56@hotmail.com
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */

package flowrestapitypes

import (
	"time"
)

//ConfigurationEntry type for the rest api
type ConfigurationEntry struct {
	Name string `json:"name"`

	Value string `json:"value"`

	RequestURL string `json:"requestURL"`

	Time time.Time `json:"time"`
}
