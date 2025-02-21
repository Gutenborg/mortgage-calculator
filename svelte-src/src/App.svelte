<script lang="ts">
  import Input from "./lib/Input.svelte";

  let amount = $state(100000);
  let interest = $state(5);
  let term = $state(30);

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const formAmount = Number(formData.get("loan-amount"));
    const formInterest = Number(formData.get("interest-rate"));
    const formTerm = Number(formData.get("loan-term"));

    if (
      Number.isNaN(formAmount) ||
      Number.isNaN(formInterest) ||
      Number.isNaN(formTerm)
    ) {
      console.error("One of the values did not convert to a number: ", {
        amount,
        interest,
        term,
      });

      return;
    }

    amount = formAmount;
    interest = formInterest;
    term = formTerm;
  };

  const payment = $derived(
    ((interest / 100 / 12) * amount) /
      (1 - (1 + interest / 100 / 12) ** (-term * 12))
  );

  const formattedPayment = $derived(
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(payment)
  );
</script>

<main>
  <form class="mortgage-form" on:submit={handleSubmit}>
    <h1>Mortgage Calculator in React</h1>

    <Input
      label="Principle Loan Amount"
      defaultValue={amount.toString()}
      name="loan-amount"
      prefix="$"
      type="number"
    />

    <Input
      label="Interest Rate"
      defaultValue={interest.toString()}
      name="interest-rate"
      suffix="%"
    />

    <Input
      label="Length of Loan"
      defaultValue={term.toString()}
      name="loan-term"
      suffix="Years"
      type="number"
    />

    <button class="button" type="submit">Calculate</button>

    <p>Your monthly mortgage payment will be {formattedPayment}</p>
  </form>
</main>

<style>
  .button {
    background-color: lightblue;
    border: unset;
    cursor: pointer;
    font-weight: bold;
    padding: 0.4rem 0.6rem;
    text-transform: uppercase;
    transition: background-color 0.2s;

    &:hover {
      background-color: lightskyblue;
    }
  }
</style>
