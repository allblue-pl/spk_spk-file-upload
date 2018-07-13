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

    constructor(title, listeners, exts = '*', texts = {})
    { super();
        js0.args(arguments, 'string', js0.Preset({
            onDelete: 'function',
            onInsert: 'function',
            onUpload: 'function',
                }), [ 'string', js0.Default ], [ 'object', js0.Default ]);

        init();

        this._title = title;
        this._listeners = listeners;
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


    _createElems()
    {
        this.l.$elems.upload.addEventListener('click', (evt) => {
            evt.preventDefault();
            this._fileUpload.upload();
        });
        this.l.$elems.link_Text((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();
                this._listeners.onInsert(this.files.get(keys[0]));
            });
        });
        this.l.$elems.link_Image((elem, keys) => {
            elem.addEventListener('click', (evt) => {
                evt.preventDefault();

                this._listeners.onInsert(this.files.get(keys[0]));
            });
        });
        this.l.$elems.delete((elem, keys) => {
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
            text: (text) => {
                return text in this._texts ? this._texts[text] : `#${text}#`;
            },
        }

        this.l.$holders.fileUpload.$view = this._fileUpload;
    }

}