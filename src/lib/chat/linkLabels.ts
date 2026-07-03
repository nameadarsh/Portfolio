import type { ReactNode } from 'react';

function extractText(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  return '';
}

function isBareUrlLabel(text: string, href: string): boolean {
  if (!text) return true;
  const trimmed = text.trim();
  if (trimmed === href) return true;
  if (trimmed === href.replace(/^https?:\/\//, '')) return true;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return true;
  return false;
}

/** Maps URLs to short, readable link labels when the model emits bare URLs. */
export function resolveLinkLabel(href: string | undefined, children: ReactNode): string {
  if (!href) return extractText(children).trim() || 'Link';

  const childText = extractText(children).trim();
  if (!isBareUrlLabel(childText, href)) return childText;

  if (href.startsWith('mailto:')) {
    return href.replace(/^mailto:/i, '');
  }

  try {
    const url = new URL(href);
    const host = url.hostname.replace(/^www\./, '');

    if (host === 'linkedin.com') {
      return 'LinkedIn';
    }

    if (host === 'github.com') {
      const [, owner, repo] = url.pathname.split('/');
      if (repo) {
        return repo.replace(/_/g, ' ').replace(/-/g, ' ');
      }
      if (owner) {
        return 'GitHub';
      }
      return 'GitHub';
    }

    if (host.includes('vercel.app') || host.includes('netlify.app')) {
      return 'Live App';
    }

    if (host === 'adarshbajpai.com') {
      return 'Portfolio';
    }

    if (host === 'gmail.com' || href.includes('@')) {
      return href.replace(/^mailto:/i, '');
    }

    return host;
  } catch {
    return childText || 'View link';
  }
}

export function isExternalHref(href: string | undefined): boolean {
  if (!href) return false;
  return !href.startsWith('#') && !href.startsWith('/');
}
