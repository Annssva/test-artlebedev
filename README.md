# Auto Form

Демонстрационное Vue 3-приложение с компонентом `FormGenerator`, который динамически строит форму на основе переданной JSON-схемы.

## Возможности

Основной функционал по ТЗ:

* генерация формы на основе JSON-схемы;
* текстовые поля `text`, `email`, `password`;
* выпадающий список `select`;
* чекбокс `checkbox`;
* реактивная модель формы через `v-model`;
* валидация `required`;
* валидация `minLength`;
* валидация `pattern`;
* проверка корректности email;
* отображение сообщений об ошибках;
* проверка полей после `blur`;
* полная проверка формы при отправке.

### Дополнительные функции

Также в проекте реализованы дополнительные функции, которые не являются обязательными для основного ТЗ и добавлены для более наглядной демонстрации возможностей компонента:

* переключатель видимости пароля;
* очистка выбранного значения в `select`;
* базовая accessibility-поддержка;
* unit-тесты;
* демонстрация отправленных данных формы.

Дополнительные функции не меняют основной принцип работы компонента и используются для демонстрации его возможностей.

## Стек

* Vue 3
* TypeScript
* Vite
* SCSS
* Vitest
* Vue Test Utils
* ESLint
* Prettier

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

После запуска приложение будет доступно по адресу, который покажет Vite в терминале.

## Проверка проекта

Запуск unit-тестов:

```bash
npm run test
```

Проверка ESLint:

```bash
npm run lint
```

Проверка форматирования:

```bash
npm run format:check
```

Production-сборка:

```bash
npm run build
```

## Использование `FormGenerator`

Компонент принимает JSON-схему и модель формы:

```vue
<FormGenerator
  v-model="formData"
  :schema="formSchema"
  @submit="handleSubmit"
/>
```

## Пример JSON-схемы

```ts
const formSchema = {
  fields: [
    {
      type: 'text',
      label: 'Имя',
      model: 'name',
      required: true,
    },
    {
      type: 'email',
      label: 'Email',
      model: 'email',
      required: true,
    },
    {
      type: 'password',
      label: 'Пароль',
      model: 'password',
      required: true,
      minLength: 6,
    },
    {
      type: 'select',
      label: 'Роль',
      model: 'role',
      options: ['Админ', 'Пользователь'],
      required: true,
    },
    {
      type: 'checkbox',
      label: 'Согласен с условиями',
      model: 'terms',
      required: true,
    },
  ],
}
```
