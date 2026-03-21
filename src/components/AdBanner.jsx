/**
 * Ad placement component.
 * Supports Google AdSense or custom ad networks.
 *
 * To connect AdSense:
 * 1. Add <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX" crossorigin="anonymous"></script> to index.html
 * 2. Replace the placeholder with the AdSense ad unit code
 * 3. Set the adSlot prop to your ad unit ID
 */

const VARIANTS = {
  banner: { height: '90px', maxWidth: '728px' },
  sidebar: { height: '250px', maxWidth: '300px' },
  inline: { height: '120px', maxWidth: '100%' },
  article: { height: '150px', maxWidth: '100%' },
}

export default function AdBanner({ variant = 'inline', style = {} }) {
  const size = VARIANTS[variant] || VARIANTS.inline

  return (
    <div
      style={{
        width: '100%',
        maxWidth: size.maxWidth,
        minHeight: size.height,
        margin: '1.5rem auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        ...style,
      }}
    >
      {/*
        AdSense integration:
        Replace this div with:
        <ins className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-XXXXX"
          data-ad-slot="YYYYYYY"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />

        Then add useEffect:
        useEffect(() => {
          try { (window.adsbygoogle = window.adsbygoogle || []).push({}) } catch(e) {}
        }, [])
      */}
      <div style={{
        width: '100%',
        height: size.height,
        background: 'rgba(19, 239, 245, 0.03)',
        border: '1px solid var(--border-dark)',
        borderRadius: 'var(--radius-sm)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.75rem',
      }}>
        מקום פרסומת
      </div>
    </div>
  )
}
