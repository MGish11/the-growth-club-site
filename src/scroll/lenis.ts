import type Lenis from 'lenis'

/**
 * Handle on the live Lenis instance, for the rare component that has to
 * suspend smooth scrolling — an open modal, where the page must not
 * drift behind the overlay. ScrollController owns the lifecycle; this
 * only borrows it.
 *
 * Null under prefers-reduced-motion, where Lenis is never constructed.
 * Callers must cope with that rather than assume an instance.
 */
let instance: Lenis | null = null

export const setLenis = (next: Lenis | null) => {
  instance = next
}

export const getLenis = () => instance
