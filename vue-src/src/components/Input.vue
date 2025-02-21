<script setup lang="ts">
import { ref, useAttrs } from 'vue';

export interface InputProps {
  defaultValue?: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

const { defaultValue, label, prefix, suffix } = defineProps<InputProps>();
const inputAttributes = useAttrs();

  let formId = inputAttributes.id ?? window.crypto.randomUUID();
</script>

<template>
  <div class="input-wrapper">
    <label :for="formId">{{label}}</label>

    <div class="internal-input-wrapper">
      <span class="input-prefix" v-if="!!prefix">{{prefix}}</span>
      <input :id="formId" :value="defaultValue" v-bind="$attrs" />
      <span class="input-suffix" v-if="!!suffix">{{suffix}}</span>
    </div>
  </div>
</template>

<style scoped>
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
