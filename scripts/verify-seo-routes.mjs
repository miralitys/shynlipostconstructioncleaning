import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/seo-pages.ts', import.meta.url), 'utf8')

const cityMatch = source.match(/export const cities = \[([\s\S]*?)\]\n\nexport const serviceModifiers/)
const serviceMatch = source.match(/export const serviceModifiers = \[([\s\S]*?)\]\n\nconst corePages/)

const countStrings = (value) => [...value.matchAll(/'([^']+)'/g)].length
const countTupleRows = (name) => {
  const match = source.match(new RegExp(`const ${name} = \\[([\\s\\S]*?)\\] as const`))
  if (!match) throw new Error(`Missing ${name}`)
  return [...match[1].matchAll(/\['/g)].length
}

if (!cityMatch || !serviceMatch) {
  throw new Error('Could not read city/service arrays')
}

const cityCount = countStrings(cityMatch[1])
const serviceCount = [...serviceMatch[1].matchAll(/slug:/g)].length
const coreCount = countTupleRows('corePages')
const intentCount = countTupleRows('intentPages')
const projectCount = countTupleRows('projectPages')
const supportCount = countTupleRows('supportPages')
const legalCount = 3
const homeCount = 1
const total = homeCount + legalCount + coreCount + cityCount + cityCount * serviceCount + intentCount + projectCount + supportCount

const expected = 350
const details = {
  homeCount,
  legalCount,
  coreCount,
  cityCount,
  serviceCount,
  cityServiceCount: cityCount * serviceCount,
  intentCount,
  projectCount,
  supportCount,
  total,
}

console.log(JSON.stringify(details, null, 2))

if (total !== expected) {
  throw new Error(`Expected ${expected} public routes, got ${total}`)
}
