# Visualize Development Artifact Workflows with artiFlow!

![flow](https://raw.githubusercontent.com/privet56/artiFlow/master/flow.gif)

## TODO:
### popup & links
### serveringo
### middle for paper
### right side
### pdf generation per side

## Test:

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Build:

### Client:
./node_modules/.bin/ng build --prod --target=production --environment=prod --sourcemap=false --base-href= hashlocation true

### Go WebServer (serves static files and REST API:
go build .\server\app\flowserver.go

#### Go libs:
DB:
go get github.com/mattn/go-sqlite3      //needs cgo
go get github.com/cznic/ql              //needs cgo indirectly
go get github.com/boltdb/bolt/          //key-value db

##### TODO:
open browser, cfg, log, exe icon, auth, db interface, check port accessibility
