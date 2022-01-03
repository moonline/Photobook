import { ipcRenderer, contextBridge } from 'electron';


contextBridge.exposeInMainWorld(
    'printPage',
    (pxPerCm: number) => {
        ipcRenderer.send('print', pxPerCm);
    }
);