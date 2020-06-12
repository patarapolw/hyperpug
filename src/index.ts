import h from 'hyperscript'
import { stripIndent } from 'indent-utils'
import eqdict from '@patarapolw/eqdict'

import { tokenize } from './tokenize'

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

    if (key[0] === ':') {
      return this.buildH(key, null, stripIndent(c))
    }

    let d: Record<string, string> | null = null

    if (key[0] === ':') {
      return this.buildH(key, null, stripIndent(c))
    }

    const { key: k1, dict, suffix, content } = tokenize(key)

    if (dict) {
      d = eqdict(dict)
    }

    if (suffix === '.') {
      return this.buildH(k1, d, stripIndent(c))
    } else if (suffix === ':') {
      return this.buildH(k1, d, this.precompile(content))
    }

    return this.buildH(k1, d, content || children)
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
