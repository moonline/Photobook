import { PageStore } from './PageStore';
import { PhotoBookStore } from './PhotoBookStore';

import { THUMBNAIL, ThumbnailConfig } from '../../config/app';


export class RootStore {
    public readonly photoBookStore: PhotoBookStore;
    public readonly pageStore: PageStore;

    public readonly logger: (...message: any[]) => void;

    public get config(): { thumbnail: ThumbnailConfig } {
        return {
            thumbnail: THUMBNAIL
        };
    }

    constructor() {
        this.photoBookStore = new PhotoBookStore(this);
        this.pageStore = new PageStore(this);

        // TODO: move to logger
        this.logger = console.log;
    }
}
