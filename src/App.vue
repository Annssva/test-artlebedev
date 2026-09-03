<script setup lang="ts">
import { reactive } from 'vue'
import FormGenerator from './components/form/FormGenerator.vue'
import { formSchema } from './schemas/formSchema'
import type { FormField } from './types/form'

const getInitialValue = (field: FormField): string | boolean => {
  return field.type === 'checkbox' ? false : ''
}

const createFormData = () => {
  const data: Record<string, string | boolean> = {}

  for (const field of formSchema.fields) {
    data[field.model] = getInitialValue(field)
  }

  return data
}

const formData = reactive(createFormData())

const updateFormData = (value: Record<string, string | boolean>) => {
  Object.assign(formData, value)
}
</script>

<template>
  <main class="page">
    <section class="form-card">
      <div class="form-header">
        <h1>Автоформа</h1>

        <p>Форма генерируется автоматически на основе JSON-схемы.</p>
      </div>

      <div class="form-container">
        <h2>Данные пользователя</h2>

        <FormGenerator
          :schema="formSchema"
          :model-value="formData"
          @update:model-value="updateFormData"
        />

        <pre class="form-data">{{ formData }}</pre>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.page {
  min-height: 100vh;
  padding: 48px 24px;
}

.form-card {
  width: min(100%, 720px);
  margin: 0 auto;
}

.form-header {
  margin-bottom: 40px;

  p {
    max-width: 560px;
  }
}

.form-container {
  padding: 32px;
  border: 1px solid var(--border);
  border-radius: 16px;
  box-shadow: var(--shadow);
}

.form-data {
  margin: 24px 0 0;
  padding: 16px;
  border-radius: 8px;
  background: var(--code-bg);
  color: var(--text-h);
  font-family: var(--mono);
  font-size: 14px;
  overflow-x: auto;
}

@media (max-width: 600px) {
  .page {
    padding: 24px 16px;
  }

  .form-container {
    padding: 24px 20px;
  }
}
</style>
