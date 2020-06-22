import { stripIndent } from 'indent-utils'

import { tokenize } from './tokenize'
import { h } from './h'

export type IHyperPugFilter = (s: string) => string

export interface IHyperPugFilters {
  [name: string]: IHyperPugFilter
}

export default class HyperPug {
  private filters: IHyperPugFilters

  constructor (filters: IHyperPugFilters = {}) {
    this.filters = filters
  }

  public parse (s: string): string {
    return this.precompile(s).join('')
  }

  private precompile (s: string): string[] {
    let key = ''
    let childrenRows: string[] = []
    const nodes: string[] = []

    let isInFilter = false

    for (const r of stripIndent(s).split('\n')) {
      if (!r[0] || (r[0] && r[0] !== ' ')) {
        isInFilter = false
      }

      if (/\S/.test(r[0] || ' ') && !isInFilter) {
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
      return this.buildH(key, '', stripIndent(c))
    }

    let attrs: string = ''

    if (key[0] === ':') {
      return this.buildH(key, attrs, stripIndent(c))
    }

    const { key: k1, dict, suffix, content } = tokenize(key)

    if (dict) {
      attrs = dict
    }

    if (suffix === '.') {
      return this.buildH(k1, attrs, stripIndent(c))
    } else if (suffix === ':') {
      return this.buildH(k1, attrs, this.precompile(content))
    }

    return this.buildH(k1, attrs, content || children || [])
  }

  private buildH (key: string, attrs: string, children: string | string[]) {
    if (key[0] === ':') {
      const filterName = key.substr(1)
      const fn = this.filters[filterName]
      if (!fn) {
        throw new Error(`Filter not installed: ${filterName}`)
      }

      if (typeof children !== 'string') {
        throw new Error(`Nothing to feed to filter: ${filterName}`)
      }

      return h('div', '', fn(children))
    }

    try {
      return h(key, attrs, children)
    } catch (e) {
      return h('div', attrs, children)
    }
  }
}
