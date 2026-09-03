<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  label: string
  type: 'text' | 'email' | 'password'
  modelValue: string
  error?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  blur: []
}>()

const isPasswordVisible = ref(false)

const inputType = (type: 'text' | 'email' | 'password') => {
  if (type === 'password') {
    return isPasswordVisible.value ? 'text' : 'password'
  }

  return type
}

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

const handleBlur = () => {
  emit('blur')
}

const togglePasswordVisibility = () => {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div class="field">
    <label class="field__label">
      {{ label }}

      <span class="field__input-wrapper">
        <input
          class="field__input"
          :class="{ 'field__input--error': error }"
          :type="inputType(type)"
          :value="modelValue"
          :aria-invalid="!!error"
          :aria-describedby="error ? 'field-error' : undefined"
          @input="updateValue"
          @blur="handleBlur"
        />

        <button
          v-if="type === 'password'"
          type="button"
          class="field__password-toggle"
          :aria-label="isPasswordVisible ? 'Скрыть пароль' : 'Показать пароль'"
          @click="togglePasswordVisibility"
        >
          <svg
            v-if="isPasswordVisible"
            class="field__password-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              d="M2.036 12.322a1 1 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178c.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573 3.007-9.963 7.178"
            />
            <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0" />
          </svg>

          <svg
            v-else
            class="field__password-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              d="M3.98 8.223A10.5 10.5 0 0 0 1.934 12c1.292 4.339 5.31 7.5 10.066 7.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.499a10.52 10.52 0 0 1-4.293 5.773M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
            />
          </svg>
        </button>
      </span>
    </label>

    <p
      v-if="error"
      id="field-error"
      class="field__error"
      role="alert"
    >
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
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-weight: 500;
  color: var(--text-h);
}

.field__input-wrapper {
  position: relative;
  display: block;
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

  &--error {
    border-color: #dc2626;

    &:hover,
    &:focus {
      border-color: #dc2626;
    }

    &:focus {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
  }
}

.field__input-wrapper:has(.field__password-toggle) .field__input {
  padding-right: 48px;
}

.field__password-toggle {
  position: absolute;
  top: 50%;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  transform: translateY(-50%);
  transition:
    color 0.3s ease,
    background-color 0.3s ease;

  &:hover {
    color: var(--text-h);
    background: var(--accent-bg);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-bg);
    color: var(--accent);
  }
}

.field__password-icon {
  width: 20px;
  height: 20px;
}

.field__error {
  margin: 0;
  color: #dc2626;
  font-size: 14px;
  line-height: 1.4;
}
</style>