import type { FormField } from '../types/form'

export type ValidationError = string | null

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateField = (field: FormField, value: string | boolean): ValidationError => {
  if (field.required) {
    if (field.type === 'checkbox' && value !== true) {
      return 'Поле обязательно для заполнения'
    }

    if (field.type !== 'checkbox' && String(value).trim() === '') {
      return 'Поле обязательно для заполнения'
    }
  }

  if (
    field.type !== 'checkbox' &&
    field.minLength !== undefined &&
    String(value).length < field.minLength
  ) {
    return `Минимальная длина — ${field.minLength} символов`
  }

  if (
    field.type !== 'checkbox' &&
    field.pattern !== undefined &&
    String(value) !== '' &&
    !new RegExp(field.pattern).test(String(value))
  ) {
    return 'Некорректный формат'
  }

  if (field.type === 'email' && String(value) !== '' && !emailPattern.test(String(value))) {
    return 'Введите корректный email'
  }

  return null
}
