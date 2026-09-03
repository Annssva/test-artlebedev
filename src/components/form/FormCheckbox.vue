<script setup lang="ts">
const props = defineProps<{
  id: string
  label: string
  modelValue: boolean
  error?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  blur: []
}>()

const errorId = `${props.id}-error`

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.checked)
}

const handleBlur = () => {
  emit('blur')
}
</script>

<template>
  <div class="field">
    <label class="field__label" :for="id">
      <input
        :id="id"
        class="field__checkbox"
        type="checkbox"
        :checked="modelValue"
        :aria-invalid="!!error"
        :aria-describedby="error ? errorId : undefined"
        @change="updateValue"
        @blur="handleBlur"
      />

      <span
        class="field__box"
        :class="{
          'field__box--checked': modelValue,
          'field__box--error': error,
        }"
        aria-hidden="true"
      >
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

      <span class="field__text">
        {{ label }}
      </span>
    </label>

    <p v-if="error" :id="errorId" class="field__error" role="alert">
      {{ error }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.field__label {
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

  &--checked {
    border-color: var(--accent);
    background: var(--accent);
    transform: scale(1.05);
  }

  &--error {
    border-color: #dc2626;
  }
}

.field__check {
  width: 14px;
  height: 14px;
  opacity: 0;
  transform: scale(0.4) rotate(-10deg);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;

  .field__box--checked & {
    opacity: 1;
    transform: scale(1) rotate(0);
  }
}

.field__text {
  color: var(--text-h);
}

.field__error {
  margin: 0;
  color: #dc2626;
  font-size: 14px;
  line-height: 1.4;
}
</style>
