import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { isExternalHref, resolveLinkLabel } from './linkLabels';

interface ChatMarkdownProps {
  content: string;
}

function ChatLink({ href, children }: { href?: string; children?: React.ReactNode }) {
  const label = resolveLinkLabel(href, children);
  const external = isExternalHref(href);

  return (
    <a
      href={href}
      className="chat-link"
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {label}
    </a>
  );
}

export function ChatMarkdown({ content }: ChatMarkdownProps) {
  return (
    <div className="chat-markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => <ChatLink href={href}>{children}</ChatLink>,
          code: ({ className, children, ...props }) => {
            const isBlock = className?.includes('language-');
            if (isBlock) {
              return (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            }
            return (
              <code className="chat-inline-code" {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
