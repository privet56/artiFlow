package app

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"

	"app/exeutil"
	"app/restapi"
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
func mainWithStandardGoAPI() {

	port := exeutil.GetCFG("7179", "7179") //TODO: check for accessibility
	//GO = 71 & 79

	//basic routing
	//http.HandleFunc("/", handler)
	//http.ListenAndServe(":"+port, nil)

	mux := http.NewServeMux()

	//route by function
	//mux.HandleFunc("/api", api)

	//route by struct
	api := restapi.API{} //TODO: auth
	api.InitWithStdMux(mux)
	//mux.Handle("/api", &api)

	//route by restapi-init

	staticDir := exeutil.GetCFG("staticDir", ".")
	files := http.FileServer(http.Dir(staticDir /*dev: "../flow-build"*/))
	mux.Handle("/", files) //http.StripPrefix("/static/", files)

	server := &http.Server{
		Addr:    "0.0.0.0:" + port,
		Handler: mux,
	}

	exeutil.Loginf("starting on port:" + port + " with staticDir:'" + staticDir + "'")
	exeutil.OpenBrowser("http://localhost:" + port + "/")

	////alternative 1: start and block:
	//server.ListenAndServe()
	////alternative 2: start with go routine:
	httpErrChan := make(chan error)
	go func() { httpErrChan <- server.ListenAndServe() }()
	select {
	case err := <-httpErrChan:
		log.Fatal("HTTP Error: ", err)
	}
}

//MainWithGorilla function
func MainWithGorilla() {

	port := exeutil.GetCFG("7179", "7179") //TODO: check for accessibility

	formatter := render.New(render.Options{
		IndentJSON: true,
	})

	n := negroni.Classic()
	mx := mux.NewRouter()

	api := restapi.API{} //TODO: auth
	api.InitWithMux(mx, formatter)

	staticDir := exeutil.GetCFG("staticDir", ".")
	mx.PathPrefix("/").Handler(http.FileServer(http.Dir(staticDir)))

	exeutil.Loginf("starting on port:" + port + " with staticDir:'" + staticDir + "'")

	n.UseHandler(mx)

	////alternative 1: start and block:
	//n.Run(":" + port)
	////alternative 2: start with go routine:
	httpErrChan := make(chan error)
	go func() { httpErrChan <- http.ListenAndServe(":"+port, n) }()
	select {
	case err := <-httpErrChan:
		log.Fatal("HTTP Error: ", err)
	}
}
