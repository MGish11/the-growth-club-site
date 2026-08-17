import { Fragment } from 'react'
import { Wipe } from './Wipe'
import { WIPE } from '../config/tuning'

/**
 * Renders a justified uppercase statement block, turning any word
 * wrapped in {braces} into a <Wipe>. Successive wipes inside one
 * statement are staggered so they read left-to-right rather than
 * firing together.
 *
 *   <Statement text="WE BUILD {PREDICTABLE} GROWTH" />
 */
export function Statement({ text, className = '' }: { text: string; className?: string }) {
  const parts = text.split(/(\{[^}]+\})/g).filter(Boolean)
  let wipeIndex = 0

  return (
    <p className={`t-statement ${className}`}>
      {parts.map((part, i) => {
        if (part.startsWith('{') && part.endsWith('}')) {
          const delay = wipeIndex * WIPE.stagger
          wipeIndex += 1
          return (
            <Wipe key={i} delay={delay}>
              {part.slice(1, -1)}
            </Wipe>
          )
        }
        return <Fragment key={i}>{part}</Fragment>
      })}
    </p>
  )
}
