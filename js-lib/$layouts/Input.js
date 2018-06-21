'use strict';

const
    spocky = require('spocky')
;

export default class Input extends spocky.Layout {

    static get Content() {
        return [["div",{"style":["display: none;"]},["input",{"_elem":["fileInput"],"type":["file"],"accept":["$extensions"],"style":["display: none;"]}]]];
    }


    constructor()
    {
        super(Input.Content);
    }

}
