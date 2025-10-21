import { LogicalElement } from "logical-elements";

export class LeField extends LogicalElement {
    _internals = this.attachInternals();
    _formId: string;
    _inputElement: HTMLInputElement;
    _labelElement: HTMLLabelElement;

    // Attributes
    get defaultValue() {
        return this.getAttribute("default-value");
    }

    get name() {
        return this.getAttribute("name");
    }

    get prefix() {
        return this.getAttribute("prefix");
    }

    get suffix() {
        return this.getAttribute("suffix");
    }

    onConnected() {
        this._formId = this.getAttribute("id") ?? crypto.randomUUID();
    }

    onParsed() {
        this.classList.add("input-wrapper");

        // Find elements
        this.eachChild((child) => {
            if (this._labelElement === undefined && child instanceof HTMLLabelElement) {
                this._labelElement = child;
            }

            if (this._inputElement === undefined && child instanceof HTMLInputElement) {
                this._inputElement = child;
            }
        });

        if (!(this._labelElement instanceof HTMLLabelElement) || !(this._inputElement instanceof HTMLInputElement)) {
            return;
        }

        // Setup label
        this._labelElement.setAttribute("for", this._formId);

        // Setup input
        this._inputElement.setAttribute("id", this._formId);
        this._inputElement.setAttribute("name", this.name ?? this._formId);
        this._inputElement.value = this.defaultValue ?? "";

        this.displayPrefixSuffix();
    }

    displayPrefixSuffix() {
        // Setup prefix and suffix
        if (typeof this.prefix === "string") {
            const prefix = document.createElement("span");
            prefix.classList.add("input-prefix");
            prefix.setAttribute("set:text", this.prefix);
            this._inputElement.before(prefix);
        }

        if (typeof this.suffix === "string") {
            const suffix = document.createElement("span");
            suffix.classList.add("input-suffix");
            suffix.setAttribute("set:text", this.suffix);
            this._inputElement.after(suffix);
        }
    }
}

window.customElements.define("le-field", LeField);
