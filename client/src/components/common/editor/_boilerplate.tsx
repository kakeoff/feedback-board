import {
  diffSourcePlugin,
  markdownShortcutPlugin,
  frontmatterPlugin,
  headingsPlugin,
  imagePlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  InsertCodeBlock,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  Separator,
  StrikeThroughSupSubToggles,
  UndoRedo,
} from "@mdxeditor/editor";
import { uploadFile } from "../../../helpers/uploadFile";

export const getAllPlugins = (readonly: boolean = false) => {
  return [
    !readonly
      ? toolbarPlugin({
          toolbarContents: () => (
            <>
              <UndoRedo />
              <Separator />
              <BoldItalicUnderlineToggles />
              <CodeToggle />
              <Separator />
              <StrikeThroughSupSubToggles />
              <Separator />
              <ListsToggle options={["bullet", "number"]} />
              <Separator />
              <CreateLink />
              <InsertImage />
              <Separator />
              <InsertTable />
              <InsertThematicBreak />
              <Separator />
              <InsertCodeBlock />
            </>
          ),
        })
      : {},
    listsPlugin(),
    quotePlugin(),
    headingsPlugin({ allowedHeadingLevels: [1, 2, 3] }),
    linkPlugin(),
    linkDialogPlugin(),
    imagePlugin({ imageUploadHandler }),
    tablePlugin(),
    thematicBreakPlugin(),
    frontmatterPlugin(),
    codeBlockPlugin({ defaultCodeBlockLanguage: "" }),
    codeMirrorPlugin({
      codeBlockLanguages: {
        js: "JavaScript",
        css: "CSS",
        txt: "Plain Text",
        tsx: "TypeScript",
        "": "Unspecified",
      },
    }),
    diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
    markdownShortcutPlugin(),
  ];
};

async function imageUploadHandler(image: File) {
  const url = await uploadFile(image);
  return import.meta.env.VITE_SERVER_URL + url;
}
