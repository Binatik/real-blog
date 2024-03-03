type ParagraphProps = {
  children: React.ReactNode;
};

function Paragraph({ children }: ParagraphProps) {
  return <p>{children}</p>;
}

export { Paragraph };
