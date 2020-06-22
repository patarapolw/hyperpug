import fs from 'fs'
import assert from 'assert'

import yaml from 'js-yaml'
import HyperPug from '@/.'

const testCase = yaml.safeLoad(fs.readFileSync(`${__dirname}/index.spec.yaml`, 'utf8'))
const hp = new HyperPug()

describe('HyperPug', () => {
  testCase.HyperPug.forEach((t: any) => {
    it(t.name, () => {
      assert.strictEqual(hp.parse(t.input).trim(), t.expected.trim())
    })
  })
})
