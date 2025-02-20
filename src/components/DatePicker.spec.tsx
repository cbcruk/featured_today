import { fireEvent, render } from '@/test/utils'
import { describe, expect, it, vi } from 'vitest'
import { DatePicker } from './DatePicker'

describe('DatePicker', () => {
  it('render', () => {
    const mock = vi.fn()

    const { container, getByTestId } = render(
      <DatePicker mode="single" onMonthChange={mock} />
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <label
          class="relative text-xl self-end"
        >
          🗓️
          <input
            class="absolute top-0 left-0 w-full opacity-0 _input_c6a5f9"
            data-testid="input"
            type="date"
          />
        </label>
      </div>
    `)

    const input = getByTestId('input') as HTMLInputElement

    fireEvent.change(input, {
      target: {
        value: '2020-10-01',
      },
    })

    expect(mock).toHaveBeenCalled()
    expect(input.value).toBe('2020-10-01')
  })
})
