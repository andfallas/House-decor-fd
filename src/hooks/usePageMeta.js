import { useEffect } from 'react'

const SITE = 'House Decor FD'

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : SITE

    if (description) {
      let tag = document.querySelector('meta[name="description"]')
      if (tag) tag.setAttribute('content', description)
    }

    return () => {
      document.title = `${SITE} — Muebles de dormitorio a medida`
    }
  }, [title, description])
}
