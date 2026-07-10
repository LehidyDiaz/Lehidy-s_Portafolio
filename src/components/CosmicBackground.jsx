import Stars from './Stars'

export default function CosmicBackground() {
  return (
    <div className="cosmic-background" aria-hidden="true">
      <div className="cosmic-base" />
      <div className="cosmic-nebula cosmic-nebula-blue" />
      <div className="cosmic-nebula cosmic-nebula-green" />
      <div className="cosmic-nebula cosmic-nebula-gold" />
      <div className="cosmic-dust" />
      <div className="hero-star hero-star-one">✦</div>
      <div className="hero-star hero-star-two">✦</div>
      <div className="hero-star hero-star-three">✦</div>
      <div className="magic-orbit magic-orbit-one" />
      <div className="magic-trail magic-trail-one"><span>✦</span><i /><i /><i /></div>
      <div className="magic-trail magic-trail-two"><span>✦</span><i /><i /></div>
      <div className="cosmic-spark-cluster cosmic-spark-cluster-one"><b>✦</b><i /><i /><i /></div>
      <div className="cosmic-spark-cluster cosmic-spark-cluster-two"><b>✦</b><i /><i /><i /></div>
      <Stars />
    </div>
  )
}
