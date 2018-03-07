@echo off
SETLOCAL
SET "failed="

IF EXIST buildInfo (
	del buildInfo
)

IF EXIST Client.exe (
	del Client.exe
	echo Removing Previous Client
)
IF NOT EXIST Client.exe (
	go build -i -o Client.exe client.go >> buildInfo
) ELSE (
	echo Previous Client Removal Failed
)
IF EXIST Client.exe (
	echo Build Successful: Client.exe
) ELSE (
	SET "failed=true"
	type buildInfo
)

IF EXIST Server.exe (
	del Server.exe
	echo Removing Previous Server
)
IF NOT EXIST Server.exe (
	go build -i -o Server.exe server.go >> buildInfo
) ELSE (
	echo Previous Server Removal Failed
)
IF EXIST Server.exe (
	echo Build Successful: Server.exe
) ELSE (
	SET "failed=true"
	type buildInfo
)

IF NOT DEFINED failed (
	del buildInfo
)
echo Build Complete