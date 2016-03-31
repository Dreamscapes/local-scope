/**
 * local-scope
 *
 * @author     Robert Rossmann <rr.rossmann@me.com>
 * @copyright  2015 Robert Rossmann
 * @license    http://choosealicense.com/licenses/bsd-3-clause  BSD-3-Clause License
 */

'use strict'

const expect = require('chai').expect
const localscope = require('..')
const local = localscope()

describe('Scoped access', function() {
  it('should be function', function() {
    expect(local).to.be.a('function')
  })

  it('should return object', function() {
    expect(local({})).to.be.an('object')
  })

  it('should only accept objects as keys', function() {
    expect(() => local(1234)).to.throw(TypeError)
    expect(() => local('ab')).to.throw(TypeError)
    expect(() => local(null)).to.throw(TypeError)
  })

  it('should return the same object for the same key', function() {
    const key = {}

    expect(local(key) === local(key)).to.eql(true)
  })

  it('should return different object for different keys', function() {
    expect(local({}) === local({})).to.eql(false)
  })

  it('should preserve data added to the scope', function() {
    const key = {}

    local(key).secret = 'this must be preserved'

    expect(local(key)).to.include.key('secret')
  })
})

describe('Scope generator', function() {
  it('should be function', function() {
    expect(localscope).to.be.a('function')
  })

  it('should return function', function() {
    expect(localscope()).to.be.a('function')
  })

  it('should generate new private context for each new scope function', function() {
    const local1 = localscope()
    const local2 = localscope()
    const key = {}

    expect(local1(key) === local2(key)).to.eql(false)
  })
})
