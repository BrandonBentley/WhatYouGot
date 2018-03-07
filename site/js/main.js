let pack;
let rootFolder;
let previousFolders = [];
let currentFolder;
let maxResults = 10000;
let resultCounter;

$(function () {
    result = $.getJSON("/json", function (data) {
        pack = data;
        rootFolder = pack.Root;
        currentFolder = rootFolder;
        displayFolder();
        displayCounts();
    });
    if (result.fail()) {
        checkForValues();
        console.log("failed");
    }


});

function displayCounts() {
    $('.folderc').remove();
    $('.filec').remove();
    $('.foldersCount').append(`<h1 class="folderc">${pack.FolderCount}</h1>`);
    $('.filesCount').append(`<h1 class="filec">${pack.FileCount}</h1>`);
}

function displayFolder() {
    clearElements();
    checkForValues();
    generateCards();
    applyNavTools();
    applyHandlers();
    console.log("display refreshed");
}

function clearElements() {
    $('.workoutCard').remove();
    $('.backButton').remove();
    $('.searchMessage').remove();
    $('.searchField').remove();
    $('.innerBreadCrumb').remove();
}

function checkForValues() {
    if (currentFolder == null || (currentFolder.Folders.length <= 0 && currentFolder.Files.length <= 0)) {
        $("#cardCenter").append(
            `<div class="searchMessage">
                    <div class ="">
                        <h2 class="text-secondary">No Content Found</h2>
                    </div>
                </div>`
        );
    }
}

function applyHandlers() {
    $('.folderCard').on( "click", expandFolder);
    $('.searchInput').change(search);
    $('.copyButton').on("click", copyPathToClipBoard);
}

function generateCards() {
    for (let item of currentFolder.Folders) {
        $("#cardCenter").append(
            `<div class="card workoutCard btn folderCard" value="${item.Name}">
                    <div class ="card-body workoutCardContent">
                        <span class="oi oi-folder cardIcon"></span>
                        <p class="folderName">${item.Name}</p>
                    </div>
                </div>`
        );
    }
    for (let item of currentFolder.Files) {
        $("#cardCenter").append(
            `<div class="card workoutCard fileCard" value="${item.Name}">
                    <div class ="card-body workoutCardContent">
                        <span class="oi oi-file cardIcon"></span>
                        <p class="fileName">${item.Name}</p>
                        <h6>${item.FullPath}</h6>
                    </div>
                </div>`
        );
    }
}

function applyNavTools() {
    if (currentFolder != rootFolder) {
        $('.fileSystemBar').append(
            `<button class="btn btn-primary active backButton">
                    <span class="oi oi-arrow-left "></span>
                 </button>`
        );
        $('.backButton').on("click", Triverse);
    }
    $('.fileSystemBar').append(
        `<div class="searchField">
                <input class="form-control searchInput" type="text" placeholder="Search" aria-label="Search">
             </div>`
    );
    $('.breadCrumbBar').append(
        `<div class="innerBreadCrumb">
                <h6>${currentFolder.FullPath}</h6>
             </div>`
    );
}

function expandFolder(e) {
    let folderName = $(this).attr('value');

    for (let folder of currentFolder.Folders) {
        if (folder.Name == folderName) {
            //console.log("Found: " + folder.Name);
            previousFolders.push(currentFolder);
            currentFolder = folder;
            break;
        }
    }
    //console.log(folderName + " should open");
    displayFolder();
}

function Triverse() {
    if (previousFolders.length > 0) {
        //console.log(currentFolder.Name);
        currentFolder = previousFolders.pop();
        //console.log(currentFolder.Name + " " + previousFolders.length)
    }
    displayFolder();
}

function copyPathToClipBoard() {
    $(this).val().select();
    console.log("copy?")
    document.execCommand("copy");

}

function search() {
    let searchTerm = $('.searchInput').val();
    if (searchTerm == ''){
        return;
    }
    let searchResults;
    if (currentFolder.Name != "Search") {
        searchResults = {Name: "Search", Folders: [], Files: []};
        previousFolders.push(currentFolder);
        currentFolder = searchResults;
    }
    else {
        searchResults = {Name: "Search", Folders: [], Files: []};
    }
    currentFolder = searchResults;
    resultCounter = 0;
    recursiveSearch(rootFolder, searchTerm, searchResults);
    console.log(resultCounter);
    displayFolder();
}

function recursiveSearch (folder, searchTerm) {
    if (resultCounter > maxResults) {
        return;
    }
    for (let item of folder.Folders) {
        if (searchSubstring(item.Name, searchTerm)) {
            currentFolder.Folders.push(item);
            resultCounter++;
            //console.log("Found: " + item.Name + " Folder")
        }
        recursiveSearch(item, searchTerm)
    }
    for (let item of folder.Files) {
        if (searchSubstring(item.Name, searchTerm)) {
            currentFolder.Files.push(item);
            resultCounter++;
            //console.log("Found: " + item.Name + " File")
        }
    }
}

function searchSubstring(item, term) {
    if (item.toLowerCase().indexOf(term.toLowerCase()) >= 0) {
        return true;
    }
    else
        return false;
}
