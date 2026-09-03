import { describe, expect, it } from 'vitest'
import { validateField } from '../../src/composables/useFormValidation'
import type { FormField } from '../../src/types/form'

describe('validateField', () => {
  it('returns error for required text field', () => {
    const field: FormField = {
      type: 'text',
      label: 'Имя',
      model: 'name',
      required: true,
    }

    expect(validateField(field, '')).toBe('Поле обязательно для заполнения')
  })

  it('returns null for filled required text field', () => {
    const field: FormField = {
      type: 'text',
      label: 'Имя',
      model: 'name',
      required: true,
    }

    expect(validateField(field, 'Анна')).toBeNull()
  })

  it('validates minimum password length', () => {
    const field: FormField = {
      type: 'password',
      label: 'Пароль',
      model: 'password',
      required: true,
      minLength: 6,
    }

    expect(validateField(field, '123')).toBe('Минимальная длина 6 символов')
    expect(validateField(field, '123456')).toBeNull()
  })

  it('validates email', () => {
    const field: FormField = {
      type: 'email',
      label: 'Email',
      model: 'email',
      required: true,
    }

    expect(validateField(field, 'test')).toBe('Введите корректный email')
    expect(validateField(field, 'test@example.com')).toBeNull()
  })

  it('validates checkbox required value', () => {
    const field: FormField = {
      type: 'checkbox',
      label: 'Согласие',
      model: 'terms',
      required: true,
    }

    expect(validateField(field, false)).toBe('Поле обязательно для заполнения')
    expect(validateField(field, true)).toBeNull()
  })

  it('validates pattern', () => {
    const field: FormField = {
      type: 'text',
      label: 'Имя',
      model: 'name',
      pattern: '^[A-Za-z]+$',
    }

    expect(validateField(field, 'Анна')).toBe('Некорректный формат')
    expect(validateField(field, 'Anna')).toBeNull()
  })
})