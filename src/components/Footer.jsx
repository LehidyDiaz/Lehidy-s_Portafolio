import SectionAtmosphere from './SectionAtmosphere'

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-blue-deep text-gold/60 text-center border-t border-gold/10 section-stars">
      <SectionAtmosphere variant="footer" />
      <div className="flex items-center justify-center gap-4 mb-3 text-gold/20">
        <div className="h-px flex-1 max-w-[120px] bg-gold/20" />
        <span className="text-sm tracking-[0.3em]">✦ ✦ ✦</span>
        <div className="h-px flex-1 max-w-[120px] bg-gold/20" />
      </div>
      <p className="text-sm font-cinzel tracking-wider mb-1 text-gold/50">&copy; {new Date().getFullYear()} Lehidy Diaz</p>
      <p className="text-xs opacity-70 italic mb-2 text-gold/40">Draco Dormiens Nunquam Titillandus</p>
      <div className="flex items-center justify-center gap-2 text-[10px] opacity-40 font-cinzel tracking-widest text-gold/30">
        <span>✦</span>
        <span>MISCHIEF MANAGED</span>
        <span>✦</span>
      </div>
    </footer>
  )
}
