export type TextFieldType = 'text' | 'email' | 'password'

export interface BaseField {
  label: string
  model: string
  required?: boolean
  minLength?: number
  pattern?: string
}

export interface TextField extends BaseField {
  type: TextFieldType
}

export interface SelectField extends BaseField {
  type: 'select'
  options: string[]
}

export interface CheckboxField extends BaseField {
  type: 'checkbox'
}

export type FormField = TextField | SelectField | CheckboxField

export interface FormSchema {
  fields: FormField[]
}
