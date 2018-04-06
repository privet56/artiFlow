# Visualize Development Artifact Workflows with artiFlow!

![flow](https://raw.githubusercontent.com/privet56/artiFlow/master/flow.gif)

## TODO:
    client: query cfg+data and set labels, footer, header, pdf generation per side, right side with custom html(http://visjs.org/examples/network/nodeStyles/HTMLInNodes.html), popup & links on network nodes
        check https://swimlane.github.io/ngx-graph/ for small network graphs
    server: implement tests with http requests, auth, db interface, check port accessibility, speedup with (anon) goroutines, check cfg timestamp before reread
        dependency management: godep
        routes: gorilla & its subrouter

    common: use SWAGGER to generate the go & ts interface between client & server

## Test:
    Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
    Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
    Before running the tests make sure you are serving the app via `ng serve`.

## Build:
### Client:
    ./node_modules/.bin/ng build --prod --target=production --environment=prod --sourcemap=false --base-href= hashlocation true

### Go WebServer (serves static files and REST API:
    //rem go build .\server\src\flowserver.go   //does not use .syso
    cd server\src
    go build -o ..\..\flowserver.exe

#### Go libs:
    DB:
    go get github.com/mattn/go-sqlite3      //needs cgo
    go get github.com/cznic/ql              //needs cgo indirectly
    go get github.com/boltdb/bolt/          //key-value db
    ICO:
    go get github.com/akavel/rsrc
    DEPENDENCY MANAGEMENT:
    go get github.com/tools/godep           //ATTENTION: works mostly only with go standard directory structure within GOPATH
    DEPENDENCY MANAGEMENT:
    glide                                   //ATTENTION: on win64, use 0.12.3
        glide create                        //in server/src
        glide get github.com/akavel/rsrc
        glide install

## Go WebServer dependencies:

![flow.go.webserver.dependencies.png](https://raw.githubusercontent.com/privet56/artiFlow/master/flow.go.webserver.dependencies.png)

## REST API Definition with SWAGGER:

![swagger](https://raw.githubusercontent.com/privet56/artiFlow/master/swagger/swagger.ui.1.png)
