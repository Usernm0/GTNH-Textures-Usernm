// This script create circuits textures from opened gt.integrated_ciruit.psd

// It take 1 visible "base" layer and iterate each layer with numbers
// then save in "result" folder near gt.integrated_ciruit.psd

init();

function init() {
    var currentFolder = initFolder();
    main(currentFolder);
    currentFolder.execute();
}

function main(_currentFolder) {
    var leftNumbersList = app.activeDocument.layerSets.getByName("left");
    var rightNumbersList = app.activeDocument.layerSets.getByName("right");

    for (var iLeft = 0; iLeft <= 2; iLeft++) {
        var firstElement = leftNumbersList.layers.getByName(iLeft);
        firstElement.visible = true;
        for (var iRight = 0; iRight <= 9; iRight++) {
            var secondElement = rightNumbersList.layers.getByName(iRight);
            secondElement.visible = true;
            var fileName = iLeft * 10 + iRight;
            saveToPng(_currentFolder, fileName);
            secondElement.visible = false;
        }
        firstElement.visible = false;
    }
}

function initFolder() {
    var resFolder = createFolder(app.activeDocument.path, "result");
    var newFolder = createFolder(resFolder.absoluteURI, "TIME");
    return newFolder;
}

function createFolder(path, folderName) {
    var pathToDocument = decodeURI(path);
    if (folderName === "TIME") {
        var date = new Date();
        folderName = date.getTime();
    }
    var folderPath = pathToDocument + "/" + folderName;
    var folder = new Folder(folderPath);
    folder.create();
    return folder;
}

function saveToPng(folder, fileName) {
    var filePath = folder.path + "/" + folder.name + "/" + fileName + ".png";
    var file = new File(filePath);

    var pngOpts = new PNGSaveOptions();
    pngOpts.compression = 0;

    activeDocument.saveAs(file, pngOpts, true);
}
