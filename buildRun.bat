@echo off
SETLOCAL
IF EXIST ".\builds\Client.exe" (
	del .\builds\Client.exe
	echo Removing Previous Client
)
IF EXIST ".\builds\Server.exe" (
	del .\builds\Server.exe
	echo Removing Previous Server
)

go build -i -o .\builds\Client.exe client.go > buildInfo
IF EXIST ".\builds\Client.exe" (
	echo Build Successful: Client.exe
) ELSE (
	type buildInfo
)
go build -i -o .\builds\Server.exe server.go
IF EXIST ".\builds\Server.exe" (
	echo Build Successful: Server.exe
) ELSE (
	type buildInfo
)
del buildInfo
echo Build Complete

cd .\builds 
.\FullTest.bat
