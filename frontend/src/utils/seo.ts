export interface SEOMetadata {
  title: string
  description: string
  ogType?: string
  canonicalUrl?: string
}

export const updateSEOMetadata = ({
  title,
  description,
  ogType = 'website',
  canonicalUrl = window.location.href,
}: SEOMetadata) => {
  // Update Title
  document.title = title

  // Helper to get or create meta tag
  const getOrCreateMeta = (attributeName: string, attributeValue: string): HTMLMetaElement => {
    let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`) as HTMLMetaElement
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attributeName, attributeValue)
      document.head.appendChild(element)
    }
    return element
  }

  // Update Standard Meta
  getOrCreateMeta('name', 'description').setAttribute('content', description)

  // Update Open Graph (Facebook/LinkedIn) Meta
  getOrCreateMeta('property', 'og:title').setAttribute('content', title)
  getOrCreateMeta('property', 'og:description').setAttribute('content', description)
  getOrCreateMeta('property', 'og:type').setAttribute('content', ogType)
  getOrCreateMeta('property', 'og:url').setAttribute('content', canonicalUrl)
  getOrCreateMeta('property', 'og:site_name').setAttribute('content', 'DownloadMedia')

  // Update Twitter Cards Meta
  getOrCreateMeta('name', 'twitter:card').setAttribute('content', 'summary_large_image')
  getOrCreateMeta('name', 'twitter:title').setAttribute('content', title)
  getOrCreateMeta('name', 'twitter:description').setAttribute('content', description)

  // Update Canonical Link
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.appendChild(link)
  }
  link.setAttribute('href', canonicalUrl)
}
