package main

import (
	"net/http"
	"fmt"
	"strconv"
	"log"
	"bufio"
	"os"
	"sync"
	"path/filepath"
	"io/ioutil"
	//"encoding/json"
)

var port int

func init() {


}

func JSONRequestHandler(w http.ResponseWriter, r *http.Request){
	fmt.Println("JSON REQUESTED")
	http.ServeFile(w, r, "./json/data2.json")
}

func JSONPostHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Println("JSON RECIEVED")
	defer r.Body.Close()
	jsonData, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	} else {
		err2 :=ioutil.WriteFile(".\\json\\data2.json", jsonData, 0644)
		if err2 != nil {
			fmt.Println(err2)
		}

	}

}

func main() {
	port = 8080
	var wg sync.WaitGroup
	fmt.Println("Serving on port " + strconv.Itoa(port))
	path, _ := filepath.Abs(filepath.Dir(os.Args[0]))
	fmt.Println("Current Directory: " + path)
	wg.Add(1)
	go func() {
		fmt.Println("Press 'Enter' to Abort...")
		bufio.NewReader(os.Stdin).ReadBytes('\n')
		os.Exit(0)
		wg.Done()
	}()
	http.Handle("/", http.FileServer(http.Dir("./site")))
	http.Handle("/data", http.FileServer(http.Dir("../json")))
	http.HandleFunc("/json", JSONRequestHandler)
	http.HandleFunc("/post", JSONPostHandler)
	log.Fatal(http.ListenAndServe(":" + strconv.Itoa(port), nil))
	wg.Wait()
}
