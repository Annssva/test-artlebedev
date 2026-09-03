import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormGenerator from '../components/form/FormGenerator.vue'
import { formSchema } from '../schemas/formSchema'

const createModel = () => ({
  name: '',
  email: '',
  password: '',
  role: '',
  terms: false,
})

const createWrapper = (modelValue = createModel()) => {
  return mount(FormGenerator, {
    props: {
      schema: formSchema,
      modelValue,
    },
  })
}

describe('FormGenerator', () => {
  it('renders all fields from schema', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('input')).toHaveLength(4)
    expect(wrapper.find('.field__dropdown').exists()).toBe(true)
    expect(wrapper.text()).toContain('Имя')
    expect(wrapper.text()).toContain('Email')
    expect(wrapper.text()).toContain('Пароль')
    expect(wrapper.text()).toContain('Роль')
    expect(wrapper.text()).toContain('Согласен с условиями')
  })

  it('emits updated form data', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('input[type="text"]')

    await input.setValue('Анна')

    expect(wrapper.emitted('update:modelValue')).toEqual([
      [
        {
          name: 'Анна',
          email: '',
          password: '',
          role: '',
          terms: false,
        },
      ],
    ])
  })

  it('shows required error after text field blur', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('input[type="text"]')

    await input.trigger('blur')

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(input.attributes('aria-invalid')).toBe('true')
  })

  it('shows password minLength error after blur', async () => {
    const wrapper = createWrapper({
      name: 'Анна',
      email: 'anna@example.com',
      password: '123',
      role: 'Админ',
      terms: true,
    })

    const passwordInput = wrapper.find('input[type="password"]')

    await passwordInput.trigger('blur')

    expect(wrapper.text()).toContain('Минимальная длина 6 символов')
    expect(passwordInput.attributes('aria-invalid')).toBe('true')
  })

  it('shows email error after blur', async () => {
    const wrapper = createWrapper({
      name: 'Анна',
      email: 'test',
      password: '123456',
      role: 'Админ',
      terms: true,
    })

    const emailInput = wrapper.find('input[type="email"]')

    await emailInput.trigger('blur')

    expect(wrapper.text()).toContain('Введите корректный email')
    expect(emailInput.attributes('aria-invalid')).toBe('true')
  })

  it('removes error after field value becomes valid', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('input[type="text"]')

    await input.trigger('blur')

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')

    await input.setValue('Анна')

    expect(wrapper.text()).not.toContain('Поле обязательно для заполнения')
    expect(input.attributes('aria-invalid')).toBe('false')
  })

  it('validates checkbox after blur', async () => {
    const wrapper = createWrapper()

    const checkbox = wrapper.find('input[type="checkbox"]')

    await checkbox.trigger('blur')

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(checkbox.attributes('aria-invalid')).toBe('true')
  })

  it('shows checkbox error after checked value is removed', async () => {
    const wrapper = createWrapper()

    const checkbox = wrapper.find('input[type="checkbox"]')

    await checkbox.setValue(true)

    expect(wrapper.text()).not.toContain('Поле обязательно для заполнения')

    await checkbox.setValue(false)

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(wrapper.find('.field__box--error').exists()).toBe(true)
  })

  it('validates select after blur', async () => {
    const wrapper = createWrapper()

    const trigger = wrapper.find('.field__trigger')

    await trigger.trigger('blur')

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(trigger.attributes('aria-invalid')).toBe('true')
  })

  it('removes select error after option selection', async () => {
    const wrapper = createWrapper()

    const trigger = wrapper.find('.field__trigger')

    await trigger.trigger('blur')

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')

    await trigger.trigger('click')
    await wrapper.findAll('.field__option')[0].trigger('click')

    expect(wrapper.text()).not.toContain('Поле обязательно для заполнения')
  })

  it('clears selected option', async () => {
    const wrapper = createWrapper({
      name: 'Анна',
      email: 'anna@example.com',
      password: '123456',
      role: 'Админ',
      terms: true,
    })

    const clearButton = wrapper.find('.field__clear')

    expect(clearButton.exists()).toBe(true)

    await clearButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toContainEqual([
      {
        name: 'Анна',
        email: 'anna@example.com',
        password: '123456',
        role: '',
        terms: true,
      },
    ])
  })

  it('shows required errors for all fields after submit', async () => {
    const wrapper = createWrapper()

    await wrapper.find('form').trigger('submit')

    expect(wrapper.findAll('.field__error')).toHaveLength(5)
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('does not submit invalid form', async () => {
    const wrapper = createWrapper({
      name: 'Анна',
      email: 'test',
      password: '123',
      role: 'Админ',
      terms: true,
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Введите корректный email')
    expect(wrapper.text()).toContain('Минимальная длина 6 символов')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('submits valid form data', async () => {
    const modelValue = {
      name: 'Анна',
      email: 'anna@example.com',
      password: '123456',
      role: 'Админ',
      terms: true,
    }

    const wrapper = createWrapper(modelValue)

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toEqual([[modelValue]])
  })
})
