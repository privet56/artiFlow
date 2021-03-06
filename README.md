# Visualize Development Artifact Workflows with artiFlow!

![flow](https://raw.githubusercontent.com/privet56/artiFlow/master/flow.gif)

## TODO:
    client: query cfg+data and set labels, footer, header, pdf generation per side, right side with custom html(http://visjs.org/examples/network/nodeStyles/HTMLInNodes.html), popup & links on network nodes
        check https://swimlane.github.io/ngx-graph/ for small network graphs
        check if http://sigmajs.org/ or https://gojs.net/(not free!) do a better network vizualization!
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

## [OpenAPI](https://www.openapis.org/) REST API Definition with SWAGGER
:

![swagger](https://raw.githubusercontent.com/privet56/artiFlow/master/swagger/swagger.ui.1.png)

## Development Environment with Server (in Go), Client and PDF Generation:

![flow2pdf.png](https://raw.githubusercontent.com/privet56/artiFlow/master/flow2pdf.png)

## Excel Generation in the browser
    npm install --save exceljs
    npm install --save @types/exceljs
    npm install --save file-saver
    npm install --save @types/file-saver

    TODO:
    - fill prepared excel template from server
        - insert formula
        - insert graph -> update based on inserted data!
    - test download with different browser (-verions), especially IE's

![flow2xlsx.png](https://raw.githubusercontent.com/privet56/artiFlow/master/flow2xlsx.png)

## [Rx](http://reactivex.io/) Cheatsheet

    subscribe callback functions:
        onNext(value)
        onError(errorObject)
        onCompleted()


    Obervable/Observer:
        Subject
            Basic Obervable & Observer
        BehaviorSubject
            Holds & sends *last* event to new subscribers
        RelaySubject
            Holds & sends *all* sent events to new subscribers


    Use *Subject in *Service:
        private subject = new Subject<Message>();
        reportMessage(msg: Message) {
            this.subject.next(msg);
        }
        get messages(): Observable<Message> {
            return this.subject;
        }
        //use *Service in *Component:
        messageService.messages.subscribe(m => this.lastMessage = m);


    Manually created Subject in providers:
        export const MY_STATE = new InjectionToken("my_state");
        providers: [{ provide: MY_STATE, useValue: new BehaviorSubject<MyState>() }]
        //inject with
        @Inject(MY_STATE) private observer: Observer<MyState>
        @Inject(MY_STATE) private stateEvents: Observable<MyState>
        //use
        this.observer.next(new MyState());
    

    Subjects with HttpClient:
        getData(): Observable<Product[]> {
            return this.http.get<Product[]>(this.url);
        }
        deleteProduct(id: number): Observable<Product> {
            return this.http.delete<Product>(`${this.url}/${id}`);
        }
        private sendRequest<T>(verb: string, url: string, body?: Product) : Observable<T> {
            let myHeaders = new HttpHeaders();
            myHeaders = myHeaders.set("Access-Key", "<secret>");
            myHeaders = myHeaders.set("Application-Names", ["exampleApp", "exampleApp2"]);
            return this.http.request<T>(verb, url, {
                body: body,
                headers: myHeaders
            }).pipe(catchError((error: Response) => {
                    var msg:String = `Network Error: ${error.statusText} (${error.status})`;
                    this.ngZone.run(() => this.messageService.reportMessage(new Message(msg, true)), 0);
                    throwError(msg)
                }));
        }


    Imports to get error handling:
        import { Observable, throwError } from "rxjs";
        import { catchErrorr, delay } from "rxjs/operators";

    As Guard (use as canDeactivate: [UnsavedGuard] in your Routes):
        canDeactivate(component: FormComponent, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean
        {
            if (component.editing)
            {
                if (["name", "category", "price"].some(prop => component.product[prop] != component.originalProduct[prop]))
                {
                    let subject = new Subject<boolean>();
                    let responses: [string, (string) => void][] = [
                        ["Yes", () => {
                            subject.next(true);
                            subject.complete();
                        }],
                        ["No", () => {
                            this.router.navigateByUrl(this.router.url);
                            subject.next(false);
                            subject.complete();
                        }]
                    ];
                    this.messages.reportMessage(new Message("Discard Changes?", true, responses));
                    return subject;
                }
            }
            return true;
        }


    Functional API:
        filter
        map
        distinctUntilChanged
        skipWhile
        takeWhile
      Example:
        stateEvents
            .pipe(map(state => state.mode == MODES.EDIT ? state.id : -1))
            .pipe(filter(id => id != 3))
            .pipe(skipWhile(state => state.mode == MODES.EDIT))
            .pipe(distinctUntilChanged())
            .pipe(delay(999))
            .subscribe((id) => { ...
