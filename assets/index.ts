import BuildCSX from "./scripts/build";
import openFileInputDialog from "./scripts/fileInputDialog";
import FileListManager from "./scripts/fileList";
import ParseCSX from "./scripts/parse";

const uploadButton = document.getElementById('upload') as HTMLButtonElement;
const downloadAll = document.getElementById('download-all') as HTMLButtonElement;
const downloadCSX = document.getElementById('download-csx') as HTMLButtonElement;

const fileListElement = document.getElementById('list') as HTMLUListElement;

export const fileListManager = new FileListManager(fileListElement)

const sortBySelector = document.getElementById('sort') as HTMLSelectElement;
const sortDirectionSelector = document.getElementById('order') as HTMLSelectElement;

sortBySelector.addEventListener('change', () => {
    fileListManager.sortBy = sortBySelector.value as any;
    fileListManager.updateFileList();
})

sortDirectionSelector.addEventListener('change', () => {
    fileListManager.sortDirection = sortDirectionSelector.value as any;
    fileListManager.updateFileList();
})

uploadButton.addEventListener('click', async () => {

    openFileInputDialog().then((files) => {

        if (!files) return;
        const fileArray = Array.from(files);
        
        if (fileArray.find((file) => file.name.endsWith('.csx'))) {
            // csx file upload

            const csxFile = fileArray.find((file) => file.name.endsWith('.csx'))!;
            const csxReader = new FileReader();
            csxReader.readAsArrayBuffer(csxFile);
            csxReader.onload = () => {
                const csx = csxReader.result as ArrayBuffer;
                const csxFiles = ParseCSX(csx);    
            }
        }

    })

})

downloadAll.addEventListener('click', () => {

})

downloadCSX.addEventListener('click', () => {
    BuildCSX()
})