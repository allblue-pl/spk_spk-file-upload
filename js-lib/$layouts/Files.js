'use strict';

const
    spocky = require('spocky')
;

export default class Files extends spocky.Layout {

    static get Content() {
        return [["div",{"class":["card border-gray mb-3"]},["div",{"class":["card-header card-gray"]},"$title",["button",{"_elem":["upload"],"class":["btn btn-primary btn-sm m-0 float-right"]},["i",{"class":["fas fa-file-upload"],"aria-hidden":["true"]}]," ","$text('buttons_Upload')"]],["div",{"class":["card-body p-0"]},["div",{"class":["spk-e-images"]},["div",{"_elem":["files"],"class":["files ","$class"]},["div",{"class":["file-holder"],"_repeat":["files:file"]},["div",{"class":["row alert alert-success"]},["div",{"class":["col-sm-6 file-displayer"]},["a",{"_elem":["link_Image"],"href":[]},["i",{"class":["far fa-file"],"aria-hidden":["true"]}],"$file.title"]],["div",{"class":["col-sm-6 file-manager"]},["a",{"_elem":["link_Text"],"class":[],"href":[]},["i",{"class":["fa fa-image"],"aria-hidden":["true"]}],"$text('buttons_Insert')"]," / ",["a",{"_elem":["copy"],"class":[],"href":[]},["i",{"class":["fa fa-link"],"aria-hidden":["true"]}],"$text('buttons_Copy')"]," / ",["a",{"_elem":["delete"],"class":[],"href":[]},["i",{"class":["fa fa-times text-danger"],"aria-hidden":["true"]}],"$text('buttons_Delete')"]]]]]]]],["_",{"_holder":["fileUpload"]}]];
    }


    constructor()
    {
        super(Files.Content);
    }

}
