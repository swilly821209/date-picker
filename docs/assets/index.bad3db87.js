import {
  d as c,
  a as i,
  c as l,
  b as u,
  u as d,
  i as f,
  F as p,
  e as m,
  o as _,
  f as y,
} from './vendor.5429696a.js'
const g = function () {
  const t = document.createElement('link').relList
  if (t && t.supports && t.supports('modulepreload')) return
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) o(e)
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === 'childList')
        for (const a of r.addedNodes)
          a.tagName === 'LINK' && a.rel === 'modulepreload' && o(a)
  }).observe(document, { childList: !0, subtree: !0 })
  function s(e) {
    const r = {}
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerpolicy && (r.referrerPolicy = e.referrerpolicy),
      e.crossorigin === 'use-credentials'
        ? (r.credentials = 'include')
        : e.crossorigin === 'anonymous'
        ? (r.credentials = 'omit')
        : (r.credentials = 'same-origin'),
      r
    )
  }
  function o(e) {
    if (e.ep) return
    e.ep = !0
    const r = s(e)
    fetch(e.href, r)
  }
}
g()
let h = (n, t) => {
  const s = n.__vccOpts || n
  for (const [o, e] of t) s[o] = e
  return s
}
const v = {}
function L(n, t) {
  return '123456'
}
let N = h(v, [['render', L]])
const O = m('div', null, 'HI', -1),
  V = c({
    setup(n) {
      let t = i()
      return (s, o) => (
        _(),
        l(
          p,
          null,
          [
            u(
              N,
              {
                modelValue: d(t),
                'onUpdate:modelValue':
                  o[0] || (o[0] = (e) => (f(t) ? (t.value = e) : (t = e))),
              },
              null,
              8,
              ['modelValue']
            ),
            O,
          ],
          64
        )
      )
    },
  })
y(V).mount('#app')
