import { Input } from "./lib/input.ts";

globalThis.customElements.define("input-field", Input);

// Submit event handler
function handleSubmit(event: SubmitEvent) {
  event.preventDefault();
  const formElement = event.currentTarget as HTMLFormElement;
  const formData = new FormData(formElement);

  const amount = Number(formData.get("loan-amount"));
  const interest = Number(formData.get("interest-rate"));
  const term = Number(formData.get("loan-term"));

  if (Number.isNaN(amount) || Number.isNaN(interest) || Number.isNaN(term)) {
    console.error("One of the values did not convert to a number: ", {
      amount,
      interest,
      term,
    });
    return;
  }

  // Update output
  updateResult(amount, interest, term);
}

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

// Add submit event listener
const formElement = document.querySelector<HTMLFormElement>("#mortgage-form");

formElement?.addEventListener("submit", handleSubmit);

formElement?.requestSubmit();
