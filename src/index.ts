import stripIndent from "strip-indent";
import h from "hyperscript";
import { eqDictParser } from "./eqdict";

export class HyperPug {
  private filters: any;

  constructor(filters: any = {}) {
    this.filters = filters;
  }

  public parse(s: string): string {
    return h("div", this.precompile(s)).innerHTML;
  }

  private precompile(s: string): any[] {
    let key = "";
    let childrenRows: string[] = [];
    let nodes: any[] = [];

    for (const r of stripIndent(s).split("\n")) {
      if (/[A-Z.#:-_]/i.test(r[0])) {
        if (key) {
          nodes.push(this.generate(key, childrenRows));
          childrenRows = [];
        }

        key = r;
        continue;
      }

      childrenRows.push(r);
    }

    if (key) {
      nodes.push(this.generate(key, childrenRows));
    }

    return nodes
  }

  private generate(key: string, childrenRows: string[]) {
    const c = childrenRows.join("\n");
    const children = c ? this.precompile(c) : undefined;

    let m1 = "";
    let m2: any = {};
    let m3: string | undefined;

    const m = /^([^( ]+[^( .])(?:\(([^)]+)\))?(\.)? ?(.+)?$/.exec(key);

    if (!m) {
      return this.buildH(key, null, children);
    }

    m1 = m[1];

    if (m[2]) {
      m2 = eqDictParser(m[2]);
    }

    if (m[3]) {
      return this.buildH(m1, m2, stripIndent(c));
    }

    m3 = m[4];

    if (m3 && children) {
      throw new Error("Must have only either child node or string node.");
    }

    return this.buildH(m1, m2, m3 || children);
  }

  private buildH(key: string, attrs: any = null, children?: string | any[]) {
    if (key[0] === ":") {
      const fn = this.filters[key.substr(1)];
      if (!fn) {
        throw new Error("Filter not installed");
      }

      if (typeof children !== "string") {
        throw new Error("Nothing to feed to filter");
      }

      return h("div", {innerHTML: fn(children)})
    }

    attrs = attrs || {};
    for (const [k, v] of Object.entries(attrs)) {
      if (!v) {
        attrs[k] = "";
      }
    }

    return h(key, {attrs: attrs || {}}, children);
  }
}