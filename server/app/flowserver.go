package main

import (
	"net/http"

	"./restapi"
)

/*
func api(writer http.ResponseWriter, request *http.Request) {

	fmt.Fprintf(writer, "{ HelloWorld:'%s' }", request.URL.Path[1:])
	//ApiHandler.ServeHTTP(writer, request)
}
type ApiHandler struct{}
func (h *ApiHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "{ HelloWorldFromApiHandler:'%s' }", r.URL.Path[1:])
}
*/
func main() {

	port := "7179" //TODO: check for accessibility
	//GO = 71 & 79

	//basic routing
	//http.HandleFunc("/", handler)
	//http.ListenAndServe(":"+port, nil)

	mux := http.NewServeMux()

	//route by function
	//mux.HandleFunc("/api", api)

	//route by struct
	api := restapi.Api{} //TODO: auth
	mux.Handle("/api", &api)

	files := http.FileServer(http.Dir("../flow-build"))
	mux.Handle("/", files) //http.StripPrefix("/static/", files)

	server := &http.Server{
		Addr:    "0.0.0.0:" + port,
		Handler: mux,
	}
	server.ListenAndServe()
}
