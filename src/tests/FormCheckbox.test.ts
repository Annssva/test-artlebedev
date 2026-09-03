import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import FormCheckbox from '../components/form/FormCheckbox.vue'

describe('FormCheckbox', () => {
  it('renders label and checkbox', () => {
    const wrapper = mount(FormCheckbox, {
      props: {
        id: 'terms',
        label: 'Согласен с условиями',
        modelValue: false,
      },
    })

    expect(wrapper.text()).toContain('Согласен с условиями')
    expect(wrapper.find('input[type="checkbox"]').exists()).toBe(true)
  })

  it('emits updated value when checked', async () => {
    const wrapper = mount(FormCheckbox, {
      props: {
        id: 'terms',
        label: 'Согласен с условиями',
        modelValue: false,
      },
    })

    await wrapper.find('input').setValue(true)

    expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
  })

  it('emits blur', async () => {
    const wrapper = mount(FormCheckbox, {
      props: {
        id: 'terms',
        label: 'Согласен с условиями',
        modelValue: false,
      },
    })

    await wrapper.find('input').trigger('blur')

    expect(wrapper.emitted('blur')).toHaveLength(1)
  })

  it('shows checked state', () => {
    const wrapper = mount(FormCheckbox, {
      props: {
        id: 'terms',
        label: 'Согласен с условиями',
        modelValue: true,
      },
    })

    expect(wrapper.find('.field__box--checked').exists()).toBe(true)
  })

  it('shows error', () => {
    const wrapper = mount(FormCheckbox, {
      props: {
        id: 'terms',
        label: 'Согласен с условиями',
        modelValue: false,
        error: 'Поле обязательно для заполнения',
      },
    })

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(wrapper.find('.field__box--error').exists()).toBe(true)
    expect(wrapper.find('input').attributes('aria-invalid')).toBe('true')
  })
})
