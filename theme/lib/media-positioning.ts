export function toPercent(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

export function toScale(value: unknown) {
  const parsed = Number(value)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1
}

export function toLength(value: unknown) {
  if (typeof value === 'number' && Number.isFinite(value)) {
    return `${value}%`
  }

  const stringValue = String(value || '').trim()
  return stringValue || '0%'
}

export function normalizePositionToken(value: unknown, axis: 'x' | 'y') {
  const token = String(value || '').trim().toLowerCase()

  if (!token) {
    return '50%'
  }

  if (axis === 'x') {
    if (token === 'left') return '0%'
    if (token === 'center') return '50%'
    if (token === 'right') return '100%'
  }

  if (axis === 'y') {
    if (token === 'top') return '0%'
    if (token === 'center') return '50%'
    if (token === 'bottom') return '100%'
  }

  return String(value)
}

export function combineCssLengths(base: unknown, offset: unknown) {
  const baseValue = String(base || '').trim()
  const offsetValue = String(offset || '').trim()

  if (!offsetValue || offsetValue === '0' || offsetValue === '0%') {
    return baseValue
  }

  const percentPattern = /^(-?\d+(?:\.\d+)?)%$/
  const basePercent = baseValue.match(percentPattern)
  const offsetPercent = offsetValue.match(percentPattern)

  if (basePercent && offsetPercent) {
    return `${Number(basePercent[1]) + Number(offsetPercent[1])}%`
  }

  const negativeOffset = offsetValue.startsWith('-')
  const normalizedOffset = negativeOffset ? offsetValue.slice(1) : offsetValue
  const operator = negativeOffset ? '-' : '+'

  return `calc(${baseValue} ${operator} ${normalizedOffset})`
}

export function resolveObjectPosition(position: unknown, offsetX: unknown, offsetY: unknown) {
  const raw = String(position || '').trim()
  const [first = 'center', second = 'center'] = raw ? raw.split(/\s+/, 2) : ['center', 'center']
  const x = normalizePositionToken(first, 'x')
  const y = normalizePositionToken(second, 'y')

  return `${combineCssLengths(x, offsetX)} ${combineCssLengths(y, offsetY)}`
}
