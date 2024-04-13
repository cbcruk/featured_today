import { render } from '@test/utils'
import { describe, expect, it } from 'vitest'
import { Header } from './Header'

describe('Header', () => {
  it('render', () => {
    const { container } = render(
      <Header>
        <Header.Title>10월 11일</Header.Title>
        <Header.DatePicker />
      </Header>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <header
          class="flex justify-between py-4 pt-0"
        >
          <h1
            class="flex items-end gap-2 relative font-bold text-2xl"
          >
            투데이
            <span
              class="text-gray-500 font-medium text-sm"
            >
              10월 11일
            </span>
          </h1>
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
        </header>
      </div>
    `)
  })
})
