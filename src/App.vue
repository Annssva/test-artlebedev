<template>
  <main class="page">
    <section class="form-card">
      <div class="form-header">
        <h1>Автоформа</h1>

        <p>Форма генерируется автоматически на основе JSON-схемы.</p>
      </div>

      <div class="form-container">
        <h2>Данные пользователя</h2>

        <div class="form-fields">
          <!-- Поля формы будут добавлены на следующих шагах -->
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

.form-fields {
  margin-top: 24px;
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
