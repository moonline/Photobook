import { ipcRenderer, contextBridge } from 'electron';


contextBridge.exposeInMainWorld(
    'printPage',
    (numberOfPages: number) => {
        ipcRenderer.send('print', numberOfPages);
    }
);