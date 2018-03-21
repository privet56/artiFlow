package main

import (
	"fmt"
	"net/http"
)

func api(writer http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(writer, "{ HelloWorld:'%s' }", request.URL.Path[1:])
}

func main() {

	port := "7179" //TODO: check for accessibility
	//GO = 71 & 79

	//http.HandleFunc("/", handler)
	//http.ListenAndServe(":"+port, nil)

	mux := http.NewServeMux()
	files := http.FileServer(http.Dir("../flow-build"))
	mux.Handle("/", files) //http.StripPrefix("/static/", files)

	mux.HandleFunc("/api", api)

	server := &http.Server{
		Addr:    "0.0.0.0:" + port,
		Handler: mux,
	}
	server.ListenAndServe()
}
