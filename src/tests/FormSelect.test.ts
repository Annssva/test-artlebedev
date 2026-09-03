import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormSelect from '../components/form/FormSelect.vue'

describe('FormSelect', () => {
  const props = {
    id: 'role',
    label: 'Роль',
    modelValue: '',
    options: ['Админ', 'Пользователь'],
  }

  it('renders label and placeholder', () => {
    const wrapper = mount(FormSelect, {
      props,
    })

    expect(wrapper.text()).toContain('Роль')
    expect(wrapper.text()).toContain('Выберите значение')
  })

  it('opens dropdown', async () => {
    const wrapper = mount(FormSelect, {
      props,
    })

    expect(wrapper.find('.field__menu').exists()).toBe(false)

    await wrapper.find('.field__trigger').trigger('click')

    expect(wrapper.find('.field__menu').exists()).toBe(true)
    expect(wrapper.text()).toContain('Админ')
    expect(wrapper.text()).toContain('Пользователь')
  })

  it('selects option', async () => {
    const wrapper = mount(FormSelect, {
      props,
    })

    await wrapper.find('.field__trigger').trigger('click')
    await wrapper.findAll('.field__option')[0].trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['Админ']])
  })

  it('emits blur', async () => {
    const wrapper = mount(FormSelect, {
      props,
    })

    await wrapper.find('.field__trigger').trigger('blur')

    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('shows error', () => {
    const wrapper = mount(FormSelect, {
      props: {
        ...props,
        error: 'Поле обязательно для заполнения',
      },
    })

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(wrapper.find('.field__trigger').attributes('aria-invalid')).toBe('true')
  })

  it('clears selected value', async () => {
    const wrapper = mount(FormSelect, {
      props: {
        ...props,
        modelValue: 'Админ',
      },
    })

    const clearButton = wrapper.find('.field__clear')

    expect(clearButton.exists()).toBe(true)

    await clearButton.trigger('click')

    expect(wrapper.emitted('update:modelValue')).toEqual([['']])
  })
})
