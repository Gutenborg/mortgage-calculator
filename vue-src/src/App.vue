<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Input from './components/Input.vue';

  let amount = ref(100000);
  let interest = ref(5);
  let term = ref(30);

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

    console.log("Running!");

    amount.value = formAmount;
    interest.value = formInterest;
    term.value = formTerm;
  };

  const payment = computed(() => (
    (interest.value / 100 / 12) * amount.value) / (1 - (1 + interest.value / 100 / 12) ** (-term.value * 12))
  );

  const formattedPayment = computed(() => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", }).format(payment.value));
</script>

<template>
  <main>
    <form class="mortgage-form" @submit="handleSubmit">
      <h1>Mortgage Calculator in React</h1>

      <Input
        label="Principle Loan Amount"
        :defaultValue="amount.toString()"
        name="loan-amount"
        prefix="$"
        type="number"
      />

      <Input
        label="Interest Rate"
        :defaultValue="interest.toString()"
        name="interest-rate"
        suffix="%"
      />

      <Input
        label="Length of Loan"
        :defaultValue="term.toString()"
        name="loan-term"
        suffix="Years"
        type="number"
      />

      <button class="button" type="submit">Calculate</button>

      <p>Your monthly mortgage payment will be {{formattedPayment}}</p>
    </form>
  </main>
</template>

<style scoped>
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
