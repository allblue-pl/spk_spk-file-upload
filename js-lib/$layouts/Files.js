'use strict';

const
    spocky = require('spocky')
;

export default class Files extends spocky.Layout {

    static get Content() {
        return [["div",{"class":["card border-gray mb-3"]},["div",{"class":["card-header card-gray"]},"Intro Image",["button",{"_elem":["upload"],"class":["btn btn-primary btn-sm m-0 float-right"]},["i",{"class":["fas fa-file-upload"],"aria-hidden":["true"]}]," ","$text('upload')","wczytaj"]],["div",{"class":["card-body p-0"]},["div",{"class":["spk-e-images"]},["div",{"_elem":["files"],"class":["images ","$class"]},["div",{"class":["image-holder"],"_repeat":["files:file"]},["div",{"class":["image-displayer mb-1"]},["a",{"_elem":["link_Image"],"href":[]},["img",{"src":["$file.uri","?t=","$timestamp"],"alt":["$file.title"]}]]],["a",{"_elem":["link_Text"],"class":["image-option"],"href":[]},["i",{"class":["fa fa-image"],"aria-hidden":["true"]}],"$text('insert')","Wstaw"],["a",{"_elem":["delete"],"class":["image-option text-center"],"href":[]},["i",{"class":["fa fa-link"],"aria-hidden":["true"]}],"$text('copy')","URL"],["a",{"_elem":["delete"],"class":["image-option text-right"],"href":[]},["i",{"class":["fa fa-times text-danger"],"aria-hidden":["true"]}],"$text('delete')","Usuń"]],["div",{"class":["mg-clear"]}]]]]],["_",{"_holder":["fileUpload"]}]];
    }


    constructor()
    {
        super(Files.Content);
    }

}
