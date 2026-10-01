import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Placeholder } from '@tiptap/extensions'
import { richTextClass } from './richTextClass'
import { RichTextToolbar } from './RichTextToolbar'

// The empty-editor hint, drawn from TipTap's data-placeholder attribute.
const placeholderClass =
  '[&_.is-editor-empty:first-child]:before:pointer-events-none [&_.is-editor-empty:first-child]:before:float-left [&_.is-editor-empty:first-child]:before:h-0 [&_.is-editor-empty:first-child]:before:text-ink-disabled [&_.is-editor-empty:first-child]:before:content-[attr(data-placeholder)]'

// TipTap editor limited to what the site renders: headings, bold/italic/underline, links, lists, quotes.
// Lazy-loaded (see RichTextField) so the editor code only downloads on the course form.
export function RichTextEditor({ labelledBy, value, onChange, placeholder, describedBy }) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [3, 4] },
        code: false,
        codeBlock: false,
        horizontalRule: false,
        link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    shouldRerenderOnTransaction: false,
    editorProps: {
      attributes: {
        role: 'textbox',
        'aria-labelledby': labelledBy,
        'aria-multiline': 'true',
        ...(describedBy && { 'aria-describedby': describedBy }),
        class: `${richTextClass} ${placeholderClass} min-h-56 px-4 py-3 focus:outline-none`,
      },
    },
    onUpdate: ({ editor: e }) => onChange(e.isEmpty ? '' : e.getHTML()),
  })

  if (!editor) return null
  return (
    <div className="rounded-xl border border-line bg-surface transition focus-within:border-primary-hover focus-within:shadow-focus-success">
      <RichTextToolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  )
}
