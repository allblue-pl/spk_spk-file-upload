'use strict';

const
    spocky = require('spocky')
;

export default class Files extends spocky.Layout {

    static get Content() {
        return [["div",{"class":["card border-gray mb-3"]},["div",{"class":["card-header card-gray"]},"$title",["button",{"_elem":["upload"],"class":["btn btn-primary btn-sm m-0 float-right"]},["i",{"class":["fas fa-file-upload"],"aria-hidden":["true"]}]," ","$text('buttons_Upload')"]],["div",{"class":["card-body p-0"]},["div",{"class":["spk-e-images"]},["div",{"_show":["loading"],"class":["files-loader"]},"$text('texts_Loading')"],["div",{"_elem":["files"],"class":["files ","$class"]},["$",{"_hide":["loading"]},["div",{"_repeat":["files:file"],"_show":["type.isImage"],"class":["image-holder"]},["div",{"class":["image-displayer mb-1"],"style":["background-image: url('","$file.imgUri","?t=","$timestamp","');'"]},["a",{"_elem":["images_Insert_Image"],"href":[""]},["img",{"src":["/dev/node_modules/spk-file-upload/images/dummy.png"],"alt":[""]}]]],["a",{"_elem":["images_Insert_Text"],"class":["image-option"],"href":[""]},["i",{"class":["fa fa-image"],"aria-hidden":["true"]}],"$text('buttons_Insert')"],["a",{"_elem":["images_Copy"],"_show":["notImplemented"],"class":["image-option text-center"],"href":[""]},["i",{"class":["fa fa-link"],"aria-hidden":["true"]}],"$text('buttons_Copy')"],["a",{"_elem":["images_Delete"],"class":["image-option text-right"],"href":[""]},["i",{"class":["fa fa-times text-danger"],"aria-hidden":["true"]}],"$text('buttons_Delete')"]],["div",{"_repeat":["files:file"],"_show":["type.isFile"],"class":["file-holder"]},["div",{"class":["row alert alert-success"]},["div",{"class":["col-sm-12 file-displayer"]},["a",{"_elem":["files_Insert_Image"],"href":[""]},["i",{"class":["far fa-file"],"aria-hidden":["true"]}],"$file.title"]],["div",{"class":["col-sm-12 file-manager"]},["a",{"_elem":["files_Insert_Text"],"class":[""],"href":[""]},["i",{"class":["fa fa-image"],"aria-hidden":["true"]}],"$text('buttons_Insert')"],["a",{"_elem":["files_Copy"],"_show":["notImplemented"],"class":[""],"href":[""]},["i",{"class":["fa fa-link"],"aria-hidden":["true"]}],"$text('buttons_Copy')"],["a",{"_elem":["files_Delete"],"class":[""],"href":[""]},["i",{"class":["fa fa-times text-danger"],"aria-hidden":["true"]}],"$text('buttons_Delete')"]]]]]]]]],["$",{"_holder":["fileUpload"]}]];
    }


    constructor()
    {
        super(Files.Content);
    }

}
