package restapi

import (
	"app/flowrestapitypes"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"app/exeutil"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

func init() {

}

// APICONFIG struct
type APICONFIG struct {
	Time       time.Time `json:"time"`
	RequestURL string    `json:"requestURL"`
	Name       string    `json:"name"`
	Value      string    `json:"value"`
	formatter  *render.Render
}

//InitWithStdMux init
func (h *APICONFIG) InitWithStdMux(mux *http.ServeMux) {

	mux.Handle("/api/config", h)
}

//InitWithMux init
func (h *APICONFIG) InitWithMux(mux *mux.Router, formatter *render.Render) {

	h.formatter = formatter
	mux.Handle("/api/config", h)
}

func (h *APICONFIG) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	cfgEntryName := r.URL.Query().Get("name")

	if cfgEntryName == "" {
		w.WriteHeader(400)
		fmt.Fprintln(w, "required parameter 'name' not provided")
		return
	}

	cfgEntryValue := exeutil.GetCFG(cfgEntryName, "")

	if cfgEntryValue == "" {
		w.WriteHeader(404)
		fmt.Fprintln(w, "value not found")
		return
	}

	w.Header().Set("Content-Type", "application/json")

	//api := APICONFIG{Time: time.Now(), Name: cfgEntryName, Value: cfgEntryValue, RequestURL: r.URL.Path[1:]}
	configurationEntry := flowrestapitypes.ConfigurationEntry{Time: time.Now(), Name: cfgEntryName, Value: cfgEntryValue, RequestURL: r.URL.Path[1:]}

	jsonStr, err := json.Marshal(configurationEntry)

	if err != nil {
		fmt.Fprintf(w, "error: %v", err) //TODO: better error handling!
	} else {
		fmt.Fprintf(w, "%s", jsonStr)
	}
}
