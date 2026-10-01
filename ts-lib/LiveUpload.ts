import FileUpload from "./FileUpload.js";
import { Module } from "spocky";
import FilesLayout from "../$layouts/FilesLayout.ts";
import abText from "ab-text";
import { ts0, ts0Assert, type TS0OptionalRequiredObject } from "@allblue/ts0";

export default class LiveUpload extends Module {
    static #Initialized: boolean = false;

    static Init(): void {
        if (LiveUpload.#Initialized)
            return;
        LiveUpload.#Initialized = true;
        
        /* Disable dragging for the whole document. */
        document.addEventListener('dragover', (evt: DragEvent) => {
            evt.stopPropagation();
            evt.preventDefault();

            if (evt.dataTransfer !== null)
                evt.dataTransfer.dropEffect = 'copy';
        });
    }


    #displayType: DisplayType;
    #files: Map<number|string, FileInfo>;
    #fileUpload: FileUpload;
    #l: FilesLayout;
    #listeners: LiveUploadListeners;
    #title: string;

    constructor(title: string, displayType: DisplayType,
            listeners: LiveUploadListeners, config_: LiveUploadConfig = {}) { 
        super();

        let config = ts0.assertType<LiveUploadConfig_Parsed>(config_, 
                p_LiveUploadConfig);

        LiveUpload.Init();

        this.#title = title;
        this.#listeners = listeners;
        this.#displayType = displayType;

        this.#files = new Map();

        this.#fileUpload = new FileUpload((files) => {
            this.#listeners.onUpload(files);
        }, config.exts, true);

        this.#l = new FilesLayout();
        this.#l.$fields.ShowInsert = listeners.onInsert !== null;
        this.#l.$fields.DummyImageUri = config.dummyImageUri;
        this.#initLayout();

        this.#initElems();

        this.$view = this.#l;
    }

    deleteAllFiles(): void {
        this.#files = new Map();
        this.#l.$fields.files = [];
    }

    deleteFile(fileId: string): void {
        this.#files.delete(fileId);
        this.#l.$fields.files().$delete(fileId);
    }

    hideLoading(): void {
        this.#l.$fields.loading = false;
    }

    refresh(): void {
        this.#l.$fields.timestamp = Date.now();
    }

    setFile(fileInfo: FileInfo): void {
        this.#files.set(fileInfo.id, fileInfo);
        this.#l.$fields.files(fileInfo.id, fileInfo);

        this.refresh();
    }

    showLoading(): void {
        this.#l.$fields.loading = true;
    }


    #initElems(): void {
        this.#l.$elems.upload.addEventListener('click', (evt: MouseEvent) => {
            evt.preventDefault();
            this.#fileUpload.upload();
        });

        /* Images */
        this.#l.$elems.images_Insert_Text((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined) {
                    ts0Assert(this.#listeners.onInsert !== null);
                    this.#listeners.onInsert(fileInfo);
                }
            });
        });
        this.#l.$elems.images_Insert_Image((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined) {
                    ts0Assert(this.#listeners.onInsert !== null);
                    this.#listeners.onInsert(fileInfo);
                }
            });
        });
        this.#l.$elems.images_Copy((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined)
                    this.#listeners.onCopy(fileInfo);
            });
        });
        this.#l.$elems.images_Delete((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined)
                    this.#listeners.onDelete(fileInfo);
            });
        });

        /* Files */
        this.#l.$elems.files_Insert_Text((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined) {
                    ts0Assert(this.#listeners.onInsert !== null);
                    this.#listeners.onInsert(fileInfo);
                }
            });
        });
        this.#l.$elems.files_Insert_Image((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                
                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined) {
                    ts0Assert(this.#listeners.onInsert !== null);
                    this.#listeners.onInsert(fileInfo);
                }
            });
        });
        this.#l.$elems.files_Copy((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined)
                    this.#listeners.onCopy(fileInfo);
            });
        });
        this.#l.$elems.files_Delete((elem: HTMLAnchorElement, 
                keys: Array<number|string>) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                let fileInfo = this.#files.get(keys[0]);
                if (fileInfo !== undefined)
                    this.#listeners.onDelete(fileInfo);
            });
        });

        this.#createElems_Images();
    }

    #createElems_Images(): void {
        this.#l.$elems.files.addEventListener('dragover', (evt: DragEvent) => {
            evt.stopPropagation();
            evt.preventDefault();

            if (evt.dataTransfer === null)
                return;
            evt.dataTransfer.dropEffect = 'copy';

            this.#l.$fields.class = 'dragover';
        });

        this.#l.$elems.files.addEventListener('dragleave', (evt: DragEvent) => {
            evt.stopPropagation();
            evt.preventDefault();

            this.#l.$fields.class = '';
        });

        this.#l.$elems.files.addEventListener('drop', (evt: DragEvent) => {
            evt.stopPropagation();
            evt.preventDefault();

            this.#l.$fields.class = '';

            if (evt.dataTransfer === null)
                return;
            let files = evt.dataTransfer.files;

            this.#listeners.onUpload(Array.from(files));
        });
    }

    #initLayout(): void {
        this.#l.$fields = {
            title: this.#title,
            type: {
                isFile: this.#displayType === 'file',
                isImage: this.#displayType === 'image',
            },
            abText: (text: string) => {
                return abText.$(text);
            },
        }

        this.#l.$holders.fileUpload.$view = this.#fileUpload;
    }

}

export type FileInfo = {
    id: string;
    title: string,
    uri: string,
    imgUri: string,
};

type DisplayType = "file"|"image";

type LiveUploadConfig = {
    dummyImageUri?: string,
    exts?: string,
};

type LiveUploadConfig_Parsed = TS0OptionalRequiredObject<LiveUploadConfig>;
const p_LiveUploadConfig = ts0.TPreset({
    dummyImageUri: [ "string", ts0.TDefault(
            "/dist/node_modules/spk-file-upload/images/dummy.png") ],
    exts: [ "string", ts0.TDefault("*") ],
});

type LiveUploadListeners = {
    onCopy: (fileInfo: FileInfo) => void,
    onDelete: (fileInfo: FileInfo) => void,
    onInsert: ((fileInfo: FileInfo) => void)|null,
    onUpload: (files: Array<File>) => void,
};