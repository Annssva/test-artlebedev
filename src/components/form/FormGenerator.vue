<script setup lang="ts">
import { reactive } from 'vue'
import FormCheckbox from './FormCheckbox.vue'
import FormSelect from './FormSelect.vue'
import FormTextField from './FormTextField.vue'
import { validateField } from '../../composables/useFormValidation'
import type { FormSchema } from '../../types/form'

const props = defineProps<{
  schema: FormSchema
  modelValue: Record<string, string | boolean>
}>()

const emit = defineEmits<{
  'update:modelValue': [value: Record<string, string | boolean>]
  submit: [value: Record<string, string | boolean>]
}>()

const errors = reactive<Record<string, string | null>>({})
const touched = reactive<Record<string, boolean>>({})

const getField = (model: string) => {
  return props.schema.fields.find((field) => field.model === model)
}

const updateField = (model: string, value: string | boolean) => {
  const field = getField(model)

  emit('update:modelValue', {
    ...props.modelValue,
    [model]: value,
  })

  if (field?.type === 'checkbox') {
    touched[model] = true
    errors[model] = validateField(field, value)
    return
  }

  if (touched[model] && field) {
    errors[model] = validateField(field, value)
  }
}

const handleBlur = (model: string) => {
  const field = getField(model)

  if (!field) {
    return
  }

  touched[model] = true
  errors[model] = validateField(field, props.modelValue[model])
}

const validateForm = () => {
  let isValid = true

  for (const field of props.schema.fields) {
    touched[field.model] = true

    const error = validateField(field, props.modelValue[field.model])

    errors[field.model] = error

    if (error) {
      isValid = false
    }
  }

  return isValid
}

const handleSubmit = () => {
  if (!validateForm()) {
    return
  }

  emit('submit', { ...props.modelValue })
}
</script>

<template>
  <form class="form" novalidate @submit.prevent="handleSubmit">
    <div class="form-fields">
      <template v-for="field in schema.fields" :key="field.model">
        <FormTextField
          v-if="field.type === 'text' || field.type === 'email' || field.type === 'password'"
          :label="field.label"
          :type="field.type"
          :model-value="modelValue[field.model] as string"
          :error="touched[field.model] ? errors[field.model] : null"
          @update:model-value="updateField(field.model, $event)"
          @blur="handleBlur(field.model)"
        />

        <FormSelect
          v-else-if="field.type === 'select'"
          :label="field.label"
          :options="field.options"
          :model-value="modelValue[field.model] as string"
          :error="touched[field.model] ? errors[field.model] : null"
          @update:model-value="updateField(field.model, $event)"
          @blur="handleBlur(field.model)"
        />

        <FormCheckbox
          v-else-if="field.type === 'checkbox'"
          :label="field.label"
          :model-value="modelValue[field.model] as boolean"
          :error="touched[field.model] ? errors[field.model] : null"
          @update:model-value="updateField(field.model, $event)"
          @blur="handleBlur(field.model)"
        />
      </template>
    </div>

    <button type="submit" class="form__submit">Отправить</button>
  </form>
</template>

<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form__submit {
  min-height: 46px;
  padding: 10px 20px;
  border: 0;
  border-radius: 8px;
  background: var(--accent);
  color: #fff;
  font: inherit;
  font-weight: 500;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    box-shadow 0.3s ease;

  &:hover {
    background: #2563eb;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px var(--accent-bg);
  }

  &:active {
    background: #1d4ed8;
  }
}
</style>
