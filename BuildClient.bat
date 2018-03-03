@echo off
SETLOCAL
IF EXIST ".\builds\Client.exe" (
	del .\builds\Client.exe
	echo Removing Previous Client
)
go build -i -o .\builds\Client.exe client.go > buildInfo
IF EXIST ".\builds\Client.exe" (
	echo Build Successful: Client.exe
) ELSE (
	type buildInfo
)
echo Build Complete
