import { PageStore } from './PageStore';
import { PhotoBookStore } from './PhotoBookStore';


export class RootStore {
    public readonly photoBookStore: PhotoBookStore;
    public readonly pageStore: PageStore;

    public readonly logger: (...message: any[]) => void;

    constructor() {
        this.photoBookStore = new PhotoBookStore(this);
        this.pageStore = new PageStore(this);

        // TODO: move to logger
        this.logger = console.log;
    }
}
