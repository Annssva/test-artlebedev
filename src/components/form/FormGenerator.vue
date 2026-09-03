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
}>()

const errors = reactive<Record<string, string | null>>({})
const touched = reactive<Record<string, boolean>>({})

const getField = (model: string) => {
  return props.schema.fields.find((field) => field.model === model)
}

const updateField = (model: string, value: string | boolean) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [model]: value,
  })

  if (touched[model]) {
    const field = getField(model)

    if (field) {
      errors[model] = validateField(field, value)
    }
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
</script>

<template>
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
</template>

<style lang="scss" scoped>
.form-fields {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
