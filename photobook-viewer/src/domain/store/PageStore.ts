import { computed, observable } from 'mobx';

import { Page as PageModel } from '../model/Page';

import { RootStore } from './RootStore';


export class PageStore {
    private rootStore: RootStore;

    @observable
    public pages: PageModel[] = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    public createPage(page: PageModel): void {
        this.pages.push(page);
    }

    public createPages(pages: PageModel[]): PageModel[] {
        pages.forEach((page) => {
            this.createPage(page);
        });
        return this.pages;
    }

    /*
	public findPrevious = (page: PageInterface) => {
		let position: number = this.pages.indexOf(page);
		if (position > 0) {
			return this.pages[position-1]
		} else if (position === 0) {
			return this.pages.slice(-1)[0];
		} else {
			null;
		}
	}

	public findNext = (page: PageInterface) => {
		let position: number = this.pages.indexOf(page);
		if (position = this.pages.length-1) {
			return this.pages[0];
		} else if (position >= 0) {
			return this.pages[position+1]
		} else {
			null;
		}
	}


	public add = (page: Page, position: number = this.pages.length): void => {
		this.pages.splice(position, 0, page);
	}

	public addBefore = (page: Page, beforePage: Page) => {
		let position: number = this.pages.indexOf(beforePage);
		if (position >= 0) {
			this.add(page, position);
		}
	}

	public addAfter = (page: Page, afterPage: Page) => {
		let position: number = this.pages.indexOf(afterPage);
		if (position >= 0) {
			this.add(page, position + 1);
		}
	}
	*/
}
