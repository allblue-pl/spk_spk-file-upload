'use strict';

const
    js0 = require('js0'),
    spocky = require('spocky'),

    $layouts = require('./$layouts')
;

export default class FileUpload extends spocky.Module
{

    get files() {
        return this._files;
    }


    constructor(callback, extensions = '.*', multiple = false)
    { super();
        js0.args(arguments, 'function', [ 'string', js0.Default ], 
                [ 'boolean', js0.Default ]);

        this._callback = callback;
        this._extensions = extensions;
        this._multiple = multiple;

        this._files = [];

        this._createInput(callback);
    }

    upload()
    {
        let event = document.createEvent('MouseEvents');
        event.initEvent('click', true, true);
        this.l.$elems.fileInput.dispatchEvent(event);
    }

    
    _createInput()
    {
        this.l = new $layouts.Input();
        this.l.$fields.extensions = this._extensions;

        let el = this.l.$elems.fileInput;
        if (this._multiple)
            el.setAttribute('multiple', true);
        el.addEventListener('change', () => {
            this._files = el.files;
            this._callback(el.files);
            this._createInput();
        });
    }

}
