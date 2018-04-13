# Visualize Development Artifact Workflows with artiFlow!

![flow](https://raw.githubusercontent.com/privet56/artiFlow/master/flow.gif)

## TODO:
    client: query cfg+data and set labels, footer, header, pdf generation per side, right side with custom html(http://visjs.org/examples/network/nodeStyles/HTMLInNodes.html), popup & links on network nodes
        check https://swimlane.github.io/ngx-graph/ for small network graphs
    server: implement tests with http requests, auth, db interface, check port accessibility, check cfg timestamp before reread
        routes: use gorilla subrouter
    Go server improvements:
        Use github/mapstructure to read arbitrary json into map!
        Better error handling: formatter.JSON(...http.StatesInternalServerError...
        Chain auth with Negroni.New(... & negroni.Wrap

## Test:
    Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
    Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
    Before running the tests make sure you are serving the app via `ng serve`.

## Build:
### Client:
    ./node_modules/.bin/ng build --prod --target=production --environment=prod --sourcemap=false --base-href= hashlocation true

### FORCED upgrade (ATTENTION: no backward-compatibility):
	$ npm install -g npm-check-updates		//only ONCE
	0 MAKE BACKUP 							//and remove node_modules
	$ ncu.cmd --upgradeAll					//possibly you need to paste the absolute path
	$ npm install							//'ng serve' & VSCode should NOT run
	$ npm outdated							//check if succeeded
	$ check if fixes necessary				//eg. below fix for pTooltip
	$ git commit & 'git push origin master'

### Go WebServer (serves static files and REST API:
    //rem go build .\server\src\flowserver.go   //does not use .syso
    cd server\src
    go build -o ..\..\flowserver.exe -v flowservermain.go

#### Go libs:
    DB:
    go get github.com/mattn/go-sqlite3          //needs cgo
    go get github.com/cznic/ql                  //needs cgo indirectly
    go get github.com/boltdb/bolt/              //key-value db
    ICO:
    go get github.com/akavel/rsrc
    DEPENDENCY MANAGEMENT:
    go get github.com/tools/godep               //ATTENTION: works mostly only with go standard directory structure within GOPATH
    DEPENDENCY MANAGEMENT:
    glide                                       //ATTENTION: on win64, use 0.12.3
        glide create                            //in server/src
        -- glide get github.com/akavel/rsrc
        -- glide get github.com/gorilla/mux     //the usage of the following 3 libs adds 3 MB to your built binary!
        -- glide get github.com/urfave/negroni
        -- glide get github.com/unrolled/render
        glide install                           //ATTENTION: needs your source code to be in a subdir of %GOPATH%/src/ !
                                                //because only this way, go build finds /vendor/ !

## Go WebServer dependencies:

![flow.go.webserver.dependencies.png](https://raw.githubusercontent.com/privet56/artiFlow/master/flow.go.webserver.dependencies.png)

## REST API Definition with SWAGGER:

![swagger](https://raw.githubusercontent.com/privet56/artiFlow/master/swagger/swagger.ui.1.png)

## Development Environment with Server (in Go), Client and PDF Generation:

![flow2pdf.png](https://raw.githubusercontent.com/privet56/artiFlow/master/flow2pdf.png)
