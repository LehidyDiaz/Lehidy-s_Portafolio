export default function SectionDivider({ variant = 'star' }) {
  return (
    <div className={`section-divider section-divider-${variant}`} aria-hidden="true">
      <span className="divider-line divider-line-left" />
      <span className="divider-wing divider-wing-left" />
      <span className="divider-core">{variant === 'orbit' ? '◉' : '✦'}</span>
      <span className="divider-wing divider-wing-right" />
      <span className="divider-line divider-line-right" />
    </div>
  )
}
