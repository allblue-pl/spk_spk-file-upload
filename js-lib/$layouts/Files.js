'use strict';

const
    spocky = require('spocky')
;

export default class Files extends spocky.Layout {

    static get Content() {
        return [["div",{"class":["spk-e-images"]},["button",{"_elem":["upload"],"class":["btn btn-primary"]},"$texts.upload"],["div",{"_elem":["files"],"class":["images ","$class"]},["div",{"class":["col-lg-2 col-xs-3 image-holder"],"_repeat":["files:file"]},["div",{"class":["image-displayer"]},["a",{"_elem":["link_Image"],"href":[]},["img",{"src":["$file.uri","?t=","$timestamp"],"alt":["$file.title"]}]]],["a",{"_elem":["link_Text"],"href":[]},["i",{"class":["fa fa-link text-primary"],"aria-hidden":["true"]}],"Insert"],["a",{"_elem":["delete"],"href":[]},["i",{"class":["fa fa-times text-danger"],"aria-hidden":["true"]}],"Delete"]],["div",{"class":["mg-clear"]}]]],["_",{"_holder":["fileUpload"]}]];
    }


    constructor()
    {
        super(Files.Content);
    }

}
