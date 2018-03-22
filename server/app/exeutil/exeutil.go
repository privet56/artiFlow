package exeutil

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"log"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

//PATHS struct
type PATHS struct {
	ExeAbsFN string `json:"ExeAbsFN"`
	CfgAbsFN string `json:"CfgAbsFN"`
	LogAbsFN string `json:"LogAbsFN"`
}

var logger *log.Logger
var paths *PATHS

func init() {

	ExeAbsFN := getExeFNWithoutExt()
	paths = &PATHS{ExeAbsFN: ExeAbsFN, CfgAbsFN: getCFGFN(ExeAbsFN), LogAbsFN: getLogFN(ExeAbsFN)}

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

	writelog(s, "ERR ")
	return
}

//Logwrn lib function logs warning
func Logwrn(s string) {

	writelog(s, "WRN ")
	return
}

//Loginf lib function logs info
func Loginf(s string) {

	writelog(s, "INF ")
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

//GetCFG lib function
func GetCFG(cfgEntryName string, defaultCfgEntryValue string) (cfgEntryValue string) {

	cfgEntryValue = defaultCfgEntryValue

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

	/*
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
		return cfgEntryValue
	}

	cfgEntryValue = defaultCfgEntryValue
	return cfgEntryValue
}
