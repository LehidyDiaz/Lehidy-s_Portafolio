const houses = {
  gryffindor: { name: 'Gryffindor', primary: '#D9B25F', secondary: '#D9B25F', symbol: '🦁' },
  ravenclaw: { name: 'Ravenclaw', primary: '#2D4A8A', secondary: '#D9B25F', symbol: '🦅' },
  slytherin: { name: 'Slytherin', primary: '#1FA971', secondary: '#D9B25F', symbol: '🐍' },
  hufflepuff: { name: 'Hufflepuff', primary: '#D9B25F', secondary: '#2D4A8A', symbol: '🦡' },
}

export default function HouseBadge({ house, size = 'sm' }) {
  const h = houses[house]
  if (!h) return null

  const sizeClasses = size === 'lg' ? 'text-xs px-4 py-2 gap-2' : 'text-[10px] px-3 py-1 gap-1.5'

  return (
    <div
      className={`inline-flex items-center rounded-full font-semibold tracking-wider uppercase ${sizeClasses}`}
      style={{
        backgroundColor: h.primary + '15',
        color: h.primary,
        border: `1px solid ${h.primary}30`,
      }}
    >
      <span className="text-sm">{h.symbol}</span>
      <span>{h.name}</span>
    </div>
  )
}
