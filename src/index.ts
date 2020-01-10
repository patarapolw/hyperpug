import h from 'hyperscript'
import { stripIndent } from 'indent-utils'
import eqdict from '@patarapolw/eqdict'

export type IHyperPugFilter = (s: string) => string | Element

export interface IHyperPugFilters {
  [name: string]: IHyperPugFilter
}

export default class HyperPug {
  private filters: IHyperPugFilters

  constructor (filters: IHyperPugFilters = {}) {
    this.filters = filters
  }

  public parse (s: string): string {
    return h('div', this.precompile(s)).innerHTML
  }

  private precompile (s: string): Element[] {
    let key = ''
    let childrenRows: string[] = []
    const nodes: Element[] = []

    let isInFilter = false

    for (const r of stripIndent(s).split('\n')) {
      if (r[0] && r[0] !== ' ') {
        isInFilter = false
      }

      if (/\S/.test(r[0]) && !isInFilter) {
        if (r[0] === ':') {
          isInFilter = true
        }

        if (key) {
          nodes.push(this.generate(key, childrenRows))
          childrenRows = []
        }

        key = r
        continue
      }

      childrenRows.push(r)
    }

    if (key) {
      nodes.push(this.generate(key, childrenRows))
    }

    return nodes
  }

  private generate (key: string, childrenRows: string[]) {
    const c = childrenRows.join('\n')
    const children = c ? this.precompile(c) : undefined

    let m1 = ''
    let m2: Record<string, string> | null = null

    if (key[0] === ':') {
      return this.buildH(key, null, stripIndent(c))
    }

    const m = /^([^( ]+[^( .:])(?:\(([^)]+)\))?([.:])? ?(.+)?$/.exec(key)

    if (!m) {
      return this.buildH(key, null, children)
    }

    m1 = m[1]

    if (m[2]) {
      m2 = eqdict(m[2])
    }

    if (m[3] === '.') {
      return this.buildH(m1, m2, stripIndent(c))
    } else if (m[3] === ':') {
      return this.buildH(m1, m2, this.precompile(m[4]))
    }

    const m3 = m[4]

    // if (m3 && children && children.length > 0) {
    //   throw new Error("Must have only either child node or string node.");
    // }

    return this.buildH(m1, m2, m3 || children)
  }

  private buildH (key: string, attrs: Record<string, string> | null, children?: string | Element[]) {
    if (key[0] === ':') {
      const filterName = key.substr(1)
      const fn = this.filters[filterName]
      if (!fn) {
        throw new Error(`Filter not installed: ${filterName}`)
      }

      if (typeof children !== 'string') {
        throw new Error(`Nothing to feed to filter: ${filterName}`)
      }

      return h('div', { innerHTML: fn(children) })
    }

    attrs = attrs || {}
    for (const [k, v] of Object.entries(attrs)) {
      if (!v) {
        attrs[k] = ''
      }
    }

    try {
      return h(key, { attrs: attrs || {} }, children)
    } catch (e) {
      return h('div', { attrs: attrs || {} }, children)
    }
  }
}
