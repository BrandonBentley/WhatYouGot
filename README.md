# What You Need To Build This
All you need is the official [GO compiler](https://golang.org/dl/)

# How You Ask?
To build all you need to do is: 
* Have the above compiler installed and configured env properly
* If you are are Windows you can run my janky Build.bat ( Hey it works ¯\\_(ツ)_/¯ )
* If not just run the following with the extension you want:

```bash
go build -o Client.exe client.go
go build -o Server.exe server.go
```

# Things To Know
* Client takes 0-n file path arguments both relative and absolute 
(Defaults to current directory if none is given to it)
* Client does its thing, sends a POST to the server, and then promptly dies.
(this is by design... at least that's what I'm saying at this point)
* Server Serves on localhost:8080 
* Server must be in the parent folder of "site" and "json" folder to work

# Anything Else?
No I think I'm done here for today.

If it **REALLY** sucks let me know.

> **_Until next commit I bid you ado, yes I do._**
