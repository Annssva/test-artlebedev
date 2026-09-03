<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  label: string
  modelValue: string
  options: string[]
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const isOpen = ref(false)

const selectOption = (value: string) => {
  emit('update:modelValue', value)
  isOpen.value = false
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="field">
    <span class="field__label">
      {{ label }}
    </span>

    <div class="field__dropdown">
      <button
        type="button"
        class="field__trigger"
        :class="{ 'field__trigger--open': isOpen }"
        :aria-expanded="isOpen"
        @click="toggleDropdown"
      >
        <span :class="{ field__placeholder: !modelValue }">
          {{ modelValue || 'Выберите значение' }}
        </span>

        <span class="field__arrow" aria-hidden="true" />
      </button>

      <Transition name="dropdown">
        <div v-if="isOpen" class="field__menu">
          <button
            v-for="option in options"
            :key="option"
            type="button"
            class="field__option"
            :class="{ 'field__option--selected': option === modelValue }"
            @click="selectOption(option)"
          >
            <span>{{ option }}</span>

            <svg
              v-if="option === modelValue"
              class="field__check"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 8.5L6.5 12L13 4.5"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}

.field__label {
  font-weight: 500;
  color: var(--text-h);
}

.field__dropdown {
  position: relative;
}

.field__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 10px 42px 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
  background: var(--bg);
  color: var(--text-h);
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: var(--accent);
  }

  &:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-bg);
  }

  &--open {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-bg);

    .field__arrow {
      border-color: var(--accent);
      transform: translateY(-35%) rotate(225deg);
    }
  }
}

.field__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 44px;
  padding: 10px 42px 10px 12px;
  border: 1px solid var(--border);
  border-radius: 8px;
  outline: none;
  background: var(--bg);
  color: var(--text-h);
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    border-color: var(--accent);
  }

  &:focus-visible {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-bg);
  }

  &--open {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-bg);

    .field__arrow {
      transform: translateY(-35%) rotate(225deg);
    }
  }
}

.field__arrow {
  position: absolute;
  top: 50%;
  right: 15px;
  width: 9px;
  height: 9px;
  border-right: 2px solid var(--text);
  border-bottom: 2px solid var(--text);
  pointer-events: none;
  transform: translateY(-65%) rotate(45deg);
  transition: transform 0.3s ease;
}

.field__menu {
  position: absolute;
  z-index: 10;
  top: calc(100% + 8px);
  left: 0;
  width: 100%;
  padding: 6px;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--bg);
  box-shadow: var(--shadow);
  overflow: hidden;
}

.field__option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 40px;
  padding: 9px 10px;
  border: 0;
  border-radius: 7px;
  background: transparent;
  color: var(--text-h);
  font: inherit;
  text-align: left;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #f4f4f5;
  }

  &--selected {
    color: var(--accent);
    background: var(--accent-bg);
  }

  &:not(:last-child) {
    margin-bottom: 2px;
  }
}

.field__check {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
  transform-origin: top;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
