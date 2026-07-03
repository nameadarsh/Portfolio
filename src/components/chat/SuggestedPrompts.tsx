interface SuggestedPromptsProps {
  prompts: readonly string[];
  onSelect: (prompt: string) => void;
  disabled?: boolean;
}

export function SuggestedPrompts({ prompts, onSelect, disabled }: SuggestedPromptsProps) {
  return (
    <div className="chat-suggestions" role="list" aria-label="Suggested questions">
      {prompts.map((prompt) => (
        <button
          key={prompt}
          type="button"
          className="hover-target chat-suggestion-chip"
          disabled={disabled}
          onClick={() => onSelect(prompt)}
          role="listitem"
        >
          {prompt}
        </button>
      ))}
    </div>
  );
}
