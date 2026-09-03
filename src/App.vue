<script setup lang="ts">
import { ref } from 'vue'
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

const formData = ref(createFormData())
const submittedData = ref<Record<string, string | boolean> | null>(null)

const handleSubmit = (value: Record<string, string | boolean>) => {
  submittedData.value = value
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

        <FormGenerator v-model="formData" :schema="formSchema" @submit="handleSubmit" />

        <div v-if="submittedData" class="form-success">
          <h3>Форма успешно отправлена</h3>

          <pre class="form-data">{{ submittedData }}</pre>
        </div>
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

.form-success {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid var(--border);

  h3 {
    margin: 0 0 12px;
    color: var(--text-h);
    font-size: 18px;
    font-weight: 500;
  }
}

.form-data {
  margin: 0;
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
