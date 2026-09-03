import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import FormGenerator from '../../src/components/form/FormGenerator.vue'
import { formSchema } from '../../src/schemas/formSchema'

describe('FormGenerator', () => {
  const createWrapper = () =>
    mount(FormGenerator, {
      props: {
        schema: formSchema,
        modelValue: {
          name: '',
          email: '',
          password: '',
          role: '',
          terms: false,
        },
      },
    })

  it('renders all fields from schema', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('input')).toHaveLength(4)
    expect(wrapper.find('.field__dropdown').exists()).toBe(true)
  })

  it('emits updated form data', async () => {
    const wrapper = createWrapper()

    const input = wrapper.find('input[type="text"]')

    await input.setValue('Анна')

    const events = wrapper.emitted('update:modelValue')

    expect(events).toBeTruthy()
    expect(events?.at(-1)?.[0]).toEqual({
      name: 'Анна',
      email: '',
      password: '',
      role: '',
      terms: false,
    })
  })

  it('shows required errors after submit', async () => {
    const wrapper = createWrapper()

    await wrapper.find('form').trigger('submit')

    expect(wrapper.text()).toContain('Поле обязательно для заполнения')
    expect(wrapper.emitted('submit')).toBeUndefined()
  })

  it('submits valid form data', async () => {
    const wrapper = mount(FormGenerator, {
      props: {
        schema: formSchema,
        modelValue: {
          name: 'Анна',
          email: 'anna@example.com',
          password: '123456',
          role: 'Админ',
          terms: true,
        },
      },
    })

    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('submit')).toEqual([
      [
        {
          name: 'Анна',
          email: 'anna@example.com',
          password: '123456',
          role: 'Админ',
          terms: true,
        },
      ],
    ])
  })
})