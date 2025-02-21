export class Input extends HTMLElement {
  static formAssociated = true;
  renderRoot: ShadowRoot;
  internals: ElementInternals;

  formId: string;

  // Custom Attributes
  defaultValue: string | null;
  label: string | null;
  prefixAttr: string | null;
  suffix: string | null;

  constructor() {
    super();

    // Setup element
    this.renderRoot = this.attachShadow({ mode: "open" });
    this.internals = this.attachInternals();

    // Assign attributes to properties
    this.defaultValue = this.getAttribute("default-value");
    this.label = this.getAttribute("label");
    this.prefixAttr = this.getAttribute("prefix");
    this.suffix = this.getAttribute("suffix");

    // Create unique form id if we don't have one
    this.formId = this.getAttribute("id") ?? crypto.randomUUID();
    this.internals.setFormValue(this.defaultValue);
  }

  connectedCallback() {
    // Add event listener for input change
    this.addEventListener("input", this.handleInputChange);

    // Render markup
    this.renderRoot.innerHTML = `<style>${this.styles()}</style> ${this.render()}`;
  }

  handleInputChange(event: Event) {
    const target = event.composedPath()[0];

    if (target === null || !(target instanceof HTMLInputElement)) {
      return;
    }

    this.internals.setFormValue((target as HTMLInputElement).value);
  }

  render() {
    return `
    <div class="input-wrapper">
      <label for="${this.formId}">${this.label}</label>

      <div class="internal-input-wrapper">
        ${
          this.prefixAttr !== null
            ? `<span className="input-prefix">${this.prefixAttr}</span>`
            : ""
        }
        
        <input
        value="${this.defaultValue}"
        id="${this.formId}"
        name="${this.localName}"
        type="${this.getAttribute("type") ?? "text"}" />
        
        ${
          this.suffix !== null
            ? `<span class="input-suffix">${this.suffix}</span>`
            : ""
        }
      </div>
    </div>`;
  }

  styles() {
    return `
    .input-wrapper {
        display: flex;
        flex-direction: column;
    }

    .internal-input-wrapper {
        align-items: center;
        border: 1px solid gray;
        border-radius: 4px;
        display: flex;
        margin-bottom: 0.8rem;
        padding: 0rem 0.8rem;
        width: 50%;

        input {
        border: none;
        flex-grow: 1;
        outline: none;
        padding: 0.4rem 0;
        }

        &:focus-within {
        outline: lightblue;
        }
    }

    .input-prefix, .input-suffix {
        color: gray;
        margin: 0 0.1rem;
        width: max-content;
    }`;
  }
}
