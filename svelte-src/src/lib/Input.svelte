<script lang="ts">
  import type { HTMLInputAttributes } from "svelte/elements";

  export interface InputProps extends HTMLInputAttributes {
    defaultValue: string;
    label: string;
    prefix?: string;
    suffix?: string;
  }

  let { defaultValue, label, prefix, suffix, ...inputProps }: InputProps =
    $props();

  let formId = inputProps.id ?? globalThis.crypto.randomUUID();
</script>

<div class="input-wrapper">
  <label for={formId}>{label}</label>

  <div class="internal-input-wrapper">
    {#if prefix}
      <span class="input-prefix">{prefix}</span>
    {/if}

    <input id={formId} value={defaultValue} {...inputProps} />

    {#if suffix}
      <span class="input-suffix">{suffix}</span>
    {/if}
  </div>
</div>

<style>
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

  .input-prefix,
  .input-suffix {
    color: gray;
    margin: 0 0.1rem;
    width: max-content;
  }
</style>
