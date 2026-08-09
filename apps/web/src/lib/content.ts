// Renders course/post "content" fields to HTML.
// Content can be either:
//  - a plain markdown-ish string (used by our bundled fallback data), or
//  - a Payload Lexical richText JSON object (from the live CMS).

type LexicalNode = {
  type: string
  tag?: string
  format?: number | string
  text?: string
  children?: LexicalNode[]
  listType?: string
  alt?: string
  src?: string
}

function escapeHtml(str: string) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function renderTextNode(node: LexicalNode): string {
  let text = escapeHtml(node.text || '')
  const format = Number(node.format || 0)
  if (format & 1) text = `<strong>${text}</strong>`
  if (format & 2) text = `<em>${text}</em>`
  if (format & 8) text = `<u>${text}</u>`
  return text
}

function renderLexicalNode(node: LexicalNode): string {
  if (node.type === 'text') return renderTextNode(node)
  const inner = (node.children || []).map(renderLexicalNode).join('')
  switch (node.type) {
    case 'image':
      return `<img src="${escapeHtml(node.src || '')}" alt="${escapeHtml(node.alt || '')}" class="float-right mb-4 ml-6 w-full max-w-xs rounded-xl object-cover shadow-md sm:max-w-sm" />`
    case 'heading':
      return `<${node.tag || 'h3'} class="mt-8 mb-3 text-2xl font-bold text-secondary">${inner}</${node.tag || 'h3'}>`
    case 'paragraph':
      return `<p class="mt-4 text-ink/80 leading-relaxed">${inner}</p>`
    case 'list':
      return `<${node.listType === 'number' ? 'ol' : 'ul'} class="mt-4 list-disc space-y-2 pl-6 text-ink/80">${inner}</${node.listType === 'number' ? 'ol' : 'ul'}>`
    case 'listitem':
      return `<li>${inner}</li>`
    case 'quote':
      return `<blockquote class="mt-4 border-l-4 border-accent pl-4 italic text-ink/70">${inner}</blockquote>`
    case 'linebreak':
      return '<br />'
    default:
      return inner
  }
}

function isLexical(content: unknown): content is { root: { children: LexicalNode[] } } {
  return Boolean(content) && typeof content === 'object' && content !== null && 'root' in (content as object)
}

// Very small markdown subset: ## headings, - lists, **bold**, blank-line paragraphs.
function renderMarkdown(md: string): string {
  const lines = md.split('\n')
  let html = ''
  let inList = false

  const closeList = () => {
    if (inList) {
      html += '</ul>'
      inList = false
    }
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line) {
      closeList()
      continue
    }
    const inlineFormat = (text: string) => text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      closeList()
      const [, alt, src] = imageMatch
      html += `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" class="float-right mb-4 ml-6 w-full max-w-xs rounded-xl object-cover shadow-md sm:max-w-sm" />`
    } else if (line.startsWith('## ')) {
      closeList()
      html += `<h2 class="mt-10 mb-4 text-2xl font-bold text-secondary">${inlineFormat(escapeHtml(line.slice(3)))}</h2>`
    } else if (line.startsWith('### ')) {
      closeList()
      html += `<h3 class="mt-8 mb-3 text-xl font-bold text-secondary">${inlineFormat(escapeHtml(line.slice(4)))}</h3>`
    } else if (/^\d+\.\s/.test(line)) {
      closeList()
      html += `<p class="mt-4 font-semibold text-ink">${inlineFormat(escapeHtml(line))}</p>`
    } else if (line.startsWith('- ')) {
      if (!inList) {
        html += '<ul class="mt-4 list-disc space-y-2 pl-6 text-ink/80">'
        inList = true
      }
      html += `<li>${inlineFormat(escapeHtml(line.slice(2)))}</li>`
    } else {
      closeList()
      html += `<p class="mt-4 leading-relaxed text-ink/80">${inlineFormat(escapeHtml(line))}</p>`
    }
  }
  closeList()
  return html
}

export function renderContent(content: unknown): string {
  if (!content) return ''
  if (typeof content === 'string') return renderMarkdown(content)
  if (isLexical(content)) return content.root.children.map(renderLexicalNode).join('')
  return ''
}
