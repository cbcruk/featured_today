import { render } from '@test/utils'
import { describe, expect, it } from 'vitest'
import { Body } from './Body'

describe('Body', () => {
  it('render', () => {
    const { container } = render(
      <Body>
        <p>children</p>
      </Body>
    )

    expect(container).toMatchInlineSnapshot(`
      <div>
        <div
          class="flex flex-wrap"
        >
          <p>
            children
          </p>
        </div>
      </div>
    `)
    expect(container.childElementCount).toBe(1)
    expect(container).toContainHTML('<p>children</p>')
  })
})
