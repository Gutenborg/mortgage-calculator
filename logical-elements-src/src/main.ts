import "npm:logical-elements";
import "./lib/le-field.ts";
import { Input } from "./lib/input.ts";

globalThis.customElements.define("input-field", Input);

function updateResult(amount: number, rate: number, term: number) {
  const payment =
    ((rate / 100 / 12) * amount) / (1 - (1 + rate / 100 / 12) ** (-term * 12));

  const formattedPayment = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(payment);

  const outputElement = document.querySelector("#mortgage-payment");
  console.log(formattedPayment, outputElement);

  if (outputElement === null) {
    return;
  }

  outputElement.textContent = formattedPayment;
}