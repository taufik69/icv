import { AlertTriangleIcon, FileSearchIcon, ServerOffIcon } from '@/shared/components/icons'
import { env } from '@/shared/config/env'

// Turns a failed load into what the error page says: a title, what to do next, and an icon + tone.
const tones = {
  warning: { badge: 'bg-warning-soft text-warning-ink', ring: 'ring-warning/25' },
  danger: { badge: 'bg-danger-soft text-danger-ink', ring: 'ring-danger/20' },
  neutral: { badge: 'bg-surface-muted text-secondary', ring: 'ring-line' },
}

const offline = (error) => !error?.status && /fetch|network|load failed/i.test(error?.message ?? '')

export function describeError(error) {
  if (offline(error)) {
    return {
      Icon: ServerOffIcon, tone: tones.warning,
      title: "Can't reach the course server",
      text: `The dashboard couldn't connect to ${env.apiBaseUrl}. Start the server with npm run dev in the server folder, then try again.`,
    }
  }
  if (error?.status === 404) {
    return {
      Icon: FileSearchIcon, tone: tones.neutral,
      title: "We couldn't find that course",
      text: 'It may have been archived, or its page address changed. Open it again from the course list.',
    }
  }
  if (error?.status >= 500) {
    return {
      Icon: AlertTriangleIcon, tone: tones.danger,
      title: 'The server ran into a problem',
      text: 'Nothing was lost. Try again in a moment; if it keeps happening, check the server terminal for the error.',
    }
  }
  return {
    Icon: AlertTriangleIcon, tone: tones.danger,
    title: "This page didn't load",
    text: error?.status && error.message
      ? `The server said: ${error.message}`
      : 'Something unexpected stopped this page from loading. Try again; the technical details below say what happened.',
  }
}
