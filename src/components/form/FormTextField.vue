<script setup lang="ts">
defineProps<{
  label: string
  type: 'text' | 'email' | 'password'
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="field">
    <label class="field__label">
      {{ label }}

      <input class="field__input" :type="type" :value="modelValue" @input="updateValue" />
    </label>
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
  color: var(--text-h);
}

.field__input {
  width: 100%;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
  background: var(--bg);
  color: var(--text-h);
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: var(--accent);
  }

  &:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-bg);
  }
}
</style>
