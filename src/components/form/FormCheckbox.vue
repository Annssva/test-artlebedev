<script setup lang="ts">
defineProps<{
  label: string
  modelValue: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}
</script>

<template>
  <label class="field">
    <input class="field__checkbox" type="checkbox" :checked="modelValue" @change="updateValue" />

    <span class="field__box" :class="{ 'field__box--checked': modelValue }" aria-hidden="true">
      <svg class="field__check" viewBox="0 0 16 16" fill="none">
        <path
          d="M3 8.5L6.5 12L13 4.5"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>

    <span class="field__label">
      {{ label }}
    </span>
  </label>
</template>

<style lang="scss" scoped>
.field {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  cursor: pointer;
  user-select: none;

  &:hover .field__box {
    border-color: var(--accent);
  }
}

.field__checkbox {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;

  &:focus-visible + .field__box {
    box-shadow: 0 0 0 3px var(--accent-bg);
  }
}

.field__box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border: 1px solid var(--border);
  border-radius: 6px;
  color: #fff;
  background: var(--bg);
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.field__box--checked {
  border-color: var(--accent);
  background: var(--accent);
  transform: scale(1.05);
}

.field__check {
  width: 14px;
  height: 14px;
  opacity: 0;
  transform: scale(0.4) rotate(-10deg);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.field__box--checked .field__check {
  opacity: 1;
  transform: scale(1) rotate(0);
}

.field__label {
  color: var(--text-h);
  font-weight: 500;
}
</style>
