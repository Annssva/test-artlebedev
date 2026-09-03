import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormTextField from '../components/form/FormTextField.vue'

describe('FormTextField', () => {
  it('renders label and input', () => {
    const wrapper = mount(FormTextField, {
      props: {
        id: 'name',
        label: 'Имя',
        type: 'text',
        modelValue: '',
      },
    })

    expect(wrapper.text()).toContain('Имя')
    expect(wrapper.find('input').exists()).toBe(true)
  })

  it('emits updated value', async () => {
    const wrapper = mount(FormTextField, {
      props: {
        id: 'name',
        label: 'Имя',
        type: 'text',
        modelValue: '',
      },
    })

    await wrapper.find('input').setValue('Анна')

    expect(wrapper.emitted('update:modelValue')).toEqual([['Анна']])
  })

  it('emits blur', async () => {
    const wrapper = mount(FormTextField, {
      props: {
        id: 'name',
        label: 'Имя',
        type: 'text',
        modelValue: '',
      },
    })

    await wrapper.find('input').trigger('blur')

    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('shows error', () => {
    const wrapper = mount(FormTextField, {
      props: {
        id: 'name',
        label: 'Имя',
        type: 'text',
        modelValue: '',
        error: 'Поле обязательно для заполнения',
      },
    })

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })

  it('toggles password visibility', async () => {
    const wrapper = mount(FormTextField, {
      props: {
        id: 'password',
        label: 'Пароль',
        type: 'password',
        modelValue: '123456',
      },
    })

    const input = wrapper.find('input')
    const button = wrapper.find('.field__password-toggle')

    expect(input.attributes('type')).toBe('password')

    await button.trigger('click')

    expect(input.attributes('type')).toBe('text')
    expect(button.attributes('aria-label')).toBe('Скрыть пароль')

    await button.trigger('click')

    expect(input.attributes('type')).toBe('password')
    expect(button.attributes('aria-label')).toBe('Показать пароль')
  })
})
