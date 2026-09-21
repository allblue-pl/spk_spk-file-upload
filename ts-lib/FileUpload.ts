import spocky from "spocky";
import InputLayout from "../$layouts/InputLayout.ts";
import { ts0Assert } from "@allblue/ts0";

export default class FileUpload extends spocky.Module {
    #callback: (files: Array<File>) => void;
    #extensions: string;
    #files: Array<string>;
    #l: InputLayout|null;
    #multiple: boolean;

    get files(): Array<string> {
        return this.#files;
    }


    constructor(callback: (files: Array<File>) => void, extensions: string = '.*', 
            multiple: boolean = false) { 
        super();

        this.#callback = callback;
        this.#extensions = extensions;
        this.#multiple = multiple;

        this.#files = [];

        this.#l = null;

        this.#createInput();
    }

    upload(): void {
        ts0Assert(this.#l !== null, "Input not created.");

        let event = new MouseEvent("click", {
            bubbles: true,
            cancelable: true
        });
        this.#l.$elems.fileInput.dispatchEvent(event);
    }

    
    #createInput(): void {
        this.#l = new InputLayout();
        this.#l.$fields.extensions = this.#extensions;

        let el = this.#l.$elems.fileInput;
        if (this.#multiple)
            el.setAttribute('multiple', true);
        el.addEventListener('change', () => {
            this.#files = el.files;
            this.#callback(el.files);
            this.#createInput();
        });
    }
}
