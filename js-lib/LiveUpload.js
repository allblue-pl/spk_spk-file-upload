'use strict';

const
    eLibs = require('e-libs'),
    js0 = require('js0'),
    spkFileUpload = require('spk-file-upload'),
    spocky = require('spocky'),

    $layouts = require('./$layouts')
;

let initialized = false;
export function init() {
    if (initialized)
        return;
    initialized = true;
    
     /* Disable dragging for the whole document. */
     document.addEventListener('dragover', (evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'copy';
    });
}


export default class LiveUpload extends spocky.Module
{

    constructor(title, displayType, listeners, exts = '*', texts = {})
    { super();
        js0.args(arguments, 'string', 'string', js0.Preset({
            onCopy: 'function',
            onDelete: 'function',
            onInsert: 'function',
            onUpload: 'function',
                }), [ 'string', js0.Default ], [ 'object', js0.Default ]);

        if (![ 'file', 'image' ].includes(displayType))
                throw new Error(`Unknown display type '${displayType}'.`);

        init();

        this._title = title;
        this._listeners = listeners;
        this._displayType = displayType;
        this._texts = texts;

        this.l = null;
        this.files = new Map();

        this._fileUpload = new spkFileUpload.FileUpload((files) => {
            this._listeners.onUpload(files);
                }, exts, true);

        this._createLayout();
        this._createElems();

        this.$view = this.l;
    }

    deleteFile(fileId)
    {
        this.files.delete(fileId);
        this.l.$fields.files().$delete(fileId);
    }

    hideLoading()
    {
        this.l.$fields.loading = false;
    }

    refresh()
    {
        this.l.$fields.timestamp = Date.now();
    }

    setFile(fileInfo)
    {
        js0.args(arguments, js0.Preset({
            id: [ 'number', 'string' ],
            title: 'string',
            uri: 'string',
            imgUri: 'string',
        }));

        this.files.set(fileInfo.id, fileInfo);
        this.l.$fields.files(fileInfo.id, fileInfo);

        this.refresh();
    }

    showLoading()
    {
        this.l.$fields.loading = true;
    }


    _createElems()
    {
        this.l.$elems.upload.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._fileUpload.upload();
        });

        /* Images */
        this.l.$elems.images_Insert_Text((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._listeners.onInsert(this.files.get(keys[0]));
            });
        });
        this.l.$elems.images_Insert_Image((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                this._listeners.onInsert(this.files.get(keys[0]));
            });
        });
        this.l.$elems.images_Copy((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._listeners.onCopy(this.files.get(keys[0]));
            });
        });
        this.l.$elems.images_Delete((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._listeners.onDelete(this.files.get(keys[0]));
            });
        });

        /* Files */
        this.l.$elems.files_Insert_Text((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._listeners.onInsert(this.files.get(keys[0]));
            });
        });
        this.l.$elems.files_Insert_Image((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                this._listeners.onInsert(this.files.get(keys[0]));
            });
        });
        this.l.$elems.files_Copy((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._listeners.onCopy(this.files.get(keys[0]));
            });
        });
        this.l.$elems.files_Delete((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._listeners.onDelete(this.files.get(keys[0]));
            });
        });

        this._createElems_Images();
    }

    _createElems_Images()
    {
        this.l.$elems.files.addEventListener('dragover', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();
            evt.dataTransfer.dropEffect = 'copy';

            this.l.$fields.class = 'dragover';
        });

        this.l.$elems.files.addEventListener('dragleave', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();

            this.l.$fields.class = '';
        });

        this.l.$elems.files.addEventListener('drop', (evt) => {
            evt.stopPropagation();
            evt.preventDefault();

            this.l.$fields.class = '';

            var files = evt.dataTransfer.files;
            this._listeners.onUpload(files);
        });
    }

    _createLayout()
    {
        this.l = new $layouts.Files();
        
        this.l.$fields = {
            title: this._title,
            type: {
                isFile: this._displayType === 'file',
                isImage: this._displayType === 'image',
            },
            text: (text) => {
                return text in this._texts ? this._texts[text] : `#${text}#`;
            },
        }

        this.l.$holders.fileUpload.$view = this._fileUpload;
    }

}