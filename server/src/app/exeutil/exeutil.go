package exeutil

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"strconv"
	"strings"
)

const (
	//INF constant
	INF = "INF "
	//WRN constant
	WRN = "WRN "
	//ERR constant
	ERR = "ERR "
	//EXEDIR constant
	EXEDIR = "%EXEDIR%"
)

//PATHS struct
type PATHS struct {
	ExeAbsFN string `json:"ExeAbsFN"`
	CfgAbsFN string `json:"CfgAbsFN"`
	LogAbsFN string `json:"LogAbsFN"`
	EXEDIR   string `json:"EXEDIR"`
}

var logger *log.Logger
var paths *PATHS

func init() {

	ExeAbsFN := getExeFNWithoutExt()
	paths = &PATHS{ExeAbsFN: ExeAbsFN, CfgAbsFN: getCFGFN(ExeAbsFN), LogAbsFN: getLogFN(ExeAbsFN)}

	sEXEDIR, err := filepath.Abs(filepath.Dir(os.Args[0]))
	paths.EXEDIR = sEXEDIR

	logFile, err := os.OpenFile(paths.LogAbsFN, os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		log.Fatalln("Failed to open log file", err)
	}
	logger = log.New(logFile, "INFO ", log.Ldate|log.Ltime|log.Lshortfile)
}

func getExeFNWithoutExt() (fn string) {

	if paths != nil && paths.ExeAbsFN != "" {
		return paths.ExeAbsFN
	}

	sAbsExeFN := os.Args[0]

	if /*runtime.GOOS == "windows" && */ strings.HasSuffix(strings.ToLower(sAbsExeFN), ".exe") {
		sAbsExeFN = strings.TrimSuffix(sAbsExeFN, filepath.Ext(sAbsExeFN))
	}

	fn = sAbsExeFN
	return sAbsExeFN
}

func getCFGFN(exefn string) (fn string) {

	if paths != nil && paths.CfgAbsFN != "" {
		return paths.CfgAbsFN
	}

	fn = exefn + ".cfg"
	return fn
}

func getLogFN(exefn string) (fn string) {

	if paths != nil && paths.LogAbsFN != "" {
		return paths.LogAbsFN
	}

	fn = exefn + ".log"
	return fn
}

func writelog(s string, prefix string) (err error) {

	fmt.Println(prefix + s)

	logger.SetPrefix(prefix)
	logger.Println(s)
	return
}

//Logerr lib function logs error
func Logerr(s string) {

	writelog(s, ERR)
	return
}

//Logwrn lib function logs warning
func Logwrn(s string) {

	writelog(s, WRN)
	return
}

//Loginf lib function logs info
func Loginf(s string) {

	writelog(s, INF)
	return
}

//GetCFGint lib function
func GetCFGint(cfgEntryName string, defaultValue int) (cfgEntryValue int) {
	sCfgEntryValue := GetCFG(cfgEntryName, "")
	if cfgEntryValue, err := strconv.Atoi(sCfgEntryValue); err == nil {
		return cfgEntryValue
	}
	return defaultValue
}

func replacePlaceholders(s string) (sout string) {

	sout = strings.Replace(s, EXEDIR, paths.EXEDIR, -1 /*there is no limit on the number of replacements*/)
	/*
		Loginf("s:'" + s + "'")
		Loginf("EXEDIR:'" + EXEDIR + "'")
		Loginf("paths.EXEDIR:'" + paths.EXEDIR + "'")
		Loginf("sout:'" + sout + "'")
	*/
	return sout
}

//GetCFG lib function
func GetCFG(cfgEntryName string, defaultCfgEntryValue string) (cfgEntryValue string) {

	cfgEntryValue = os.Getenv(cfgEntryName)
	if cfgEntryValue != "" {
		return cfgEntryValue
	}

	cfgEntryValue = defaultCfgEntryValue

	//TODO: reread only if file changed!

	file, err := ioutil.ReadFile(getCFGFN(getExeFNWithoutExt()))
	if err != nil {
		log.Fatalln("GetCFG(1)", err)
		return
	}
	var objmap map[string]string
	err = json.Unmarshal(file, &objmap)
	if err != nil {
		log.Fatalln("GetCFG(2)", err)
		return
	}

	/*	//TODO: check if this implementation is better for supporting native numbers...
		file, err := os.Open(getCFGFN(getExeFNWithoutExt()))
		if err != nil {
			log.Fatalln("Cannot open config file", err)
			return
		}
		defer file.Close()

		decoder := json.NewDecoder(file)

		var objmap map[string]*json.RawMessage
		err = decoder.Decode(&objmap)

		//err = json.Unmarshal(*objmap[cfgEntryName], &cfgEntryValue)
		var rawMsg json.RawMessage
		err = json.Unmarshal(*objmap[cfgEntryName], &s)
	*/

	if cfgEntryValue, ok := objmap[cfgEntryName]; ok {
		return replacePlaceholders(cfgEntryValue)
	}

	cfgEntryValue = defaultCfgEntryValue
	return cfgEntryValue
}

//OpenBrowser function
func OpenBrowser(url string) {
	var err error

	switch runtime.GOOS {
	case "linux":
		err = exec.Command("xdg-open", url).Start()
	case "windows":
		err = exec.Command("rundll32", "url.dll,FileProtocolHandler", url).Start()
	case "darwin":
		err = exec.Command("open", url).Start()
	default:
		err = fmt.Errorf("unsupported platform")
	}
	if err != nil {
		log.Fatal(err)
	}
}
