package restapi

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
)

//Server struct
type Server struct {
	URL   string `json:"url"`
	Label string `json:"label"`
}

// API struct
type API struct {
	Servers    []Server  `json:"servers"`
	Time       time.Time `json:"time"`
	RequestURL string    `json:"requestURL"`
}

func init() {

}

//InitWithMux init
func (h *API) InitWithMux(mux *http.ServeMux) {

	apiConfig := APICONFIG{}
	apiConfig.InitWithMux(mux)

	mux.Handle("/api", h)
}

func (h *API) ServeHTTP(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Content-Type", "application/json")

	//api := new(Api)
	api := API{Time: time.Now(), Servers: []Server{}, RequestURL: r.URL.Path[1:]}

	jsonStr, err := json.Marshal(api)

	if err != nil {
		fmt.Fprintf(w, "error: %v", err) //TODO: better error handling!
	} else {
		fmt.Fprintf(w, "%s", jsonStr)
	}
}
