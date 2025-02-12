// @deno-types="@types/react"
import { FormEvent, useState } from "react";
import { Button, Input } from "./lib/index.ts";

function App() {
  const [loanDetails, setLoanDetails] = useState({
    amount: 100000,
    interest: 5,
    term: 30,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    
    const amount = Number(formData.get("loan-amount"));
    const interest = Number(formData.get("interest-rate"));
    const term = Number(formData.get("loan-term"));

    if (Number.isNaN(amount) || Number.isNaN(interest) || Number.isNaN(term)) {
      console.error("One of the values did not convert to a number: ", { amount, interest, term });
      return;
    }
    
    setLoanDetails({
      amount, interest, term
    });
  }

  const payment = ((loanDetails.interest / 100 / 12) * loanDetails.amount) / (1 - ((1 + (loanDetails.interest / 100 / 12)) ** (-loanDetails.term * 12)));
  const formattedPayment = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD"}).format(payment);

  return (
    <form className="mortgage-form" onSubmit={handleSubmit}>
      <h1>Mortgage Calculator in React</h1>

      <Input
        label="Principle Loan Amount"
        defaultValue={loanDetails.amount.toString()}
        name="loan-amount"
        prefix="$"
        type="number"
      />

      <Input label="Interest Rate" defaultValue={loanDetails.interest.toString()} name="interest-rate" suffix="%" />
      
      <Input
        label="Length of Loan"
        defaultValue={loanDetails.term.toString()}
        name="loan-term"
        suffix="Years"
        type="number"
      />

      <Button type="submit">Calculate</Button>

      <p>Your monthly mortgage payment will be {formattedPayment}</p>
    </form>
  );
}

export default App;
