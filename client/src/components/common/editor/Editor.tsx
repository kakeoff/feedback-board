import { MDXEditor } from "@mdxeditor/editor";
import { getAllPlugins } from "./_boilerplate";
import "./styles.css";

interface EditorProps {
  markdown: string;
  handleChange?(val: string): void;
  readOnly?: boolean;
}

export function Editor({
  markdown,
  handleChange,
  readOnly = false,
}: EditorProps) {
  return (
    <MDXEditor
      markdown={markdown}
      readOnly={readOnly}
      contentEditableClassName="prose max-w-none"
      onChange={(md) => handleChange && handleChange(md)}
      plugins={getAllPlugins(readOnly)}
    />
  );
}
