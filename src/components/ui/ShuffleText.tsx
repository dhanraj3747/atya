'use client'

import { useEffect, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#0123456789ABCDEF'

function scramble(value: string) {
  return value
    .split('')
    .map((c) =>
      c === ' ' || c === '-'
        ? c
        : CHARS[Math.floor(Math.random() * CHARS.length)]
    )
    .join('')
}

export default function ShuffleText({
  value,
  duration = 600,
  delay = 0,
}: {
  value: string
  duration?: number
  delay?: number
}) {
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined
    setDisplay(scramble(value))

    const timeoutId = setTimeout(() => {
      const start = performance.now()
      intervalId = setInterval(() => {
        const t = Math.min((performance.now() - start) / duration, 1)
        const settled = Math.floor(t * value.length)
        setDisplay(
          value
            .split('')
            .map((c, i) => {
              if (i < settled || c === ' ' || c === '-') return c
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            })
            .join('')
        )
        if (t >= 1) {
          setDisplay(value)
          if (intervalId !== undefined) clearInterval(intervalId)
        }
      }, 45)
    }, delay)

    return () => {
      clearTimeout(timeoutId)
      if (intervalId !== undefined) clearInterval(intervalId)
    }
  }, [value, duration, delay])

  return <>{display}</>
}
