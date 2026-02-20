import React from 'react';
import { useTextContext } from '../context/TextContext';

interface TextBlockProps {
  id: string;
  children: string; // The default text
  as?: React.ElementType; // The HTML tag to render (p, h1, span, etc.)
  className?: string;
}

const TextBlock: React.FC<TextBlockProps> = ({ id, children, as: Tag = 'span', className = '' }) => {
  const { getText, openMenu } = useTextContext();
  const textToRender = getText(id, children);

  return (
    <Tag 
      className={`cursor-context-menu decoration-dotted hover:underline decoration-gray-400/50 underline-offset-4 ${className}`}
      onContextMenu={(e: React.MouseEvent) => openMenu(e, id, textToRender)}
    >
      {textToRender}
    </Tag>
  );
};

export default TextBlock;