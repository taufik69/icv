import { useEditorState } from '@tiptap/react'
import {
  BoldIcon, HeadingIcon, ItalicIcon, ListIcon, ListOrderedIcon, QuoteIcon, RedoIcon, UnderlineIcon, UndoIcon,
} from '@/shared/components/icons'
import { LinkControl } from './LinkControl'
import { ToolbarButton } from './ToolbarButton'

const Divider = () => <span aria-hidden="true" className="mx-1 h-6 w-px bg-line" />

// Formatting bar above the editor. Button states follow the cursor via useEditorState.
export function RichTextToolbar({ editor }) {
  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      bold: e.isActive('bold'), italic: e.isActive('italic'), underline: e.isActive('underline'),
      h3: e.isActive('heading', { level: 3 }), h4: e.isActive('heading', { level: 4 }),
      bullet: e.isActive('bulletList'), ordered: e.isActive('orderedList'), quote: e.isActive('blockquote'),
      link: e.isActive('link'), canUndo: e.can().undo(), canRedo: e.can().redo(),
    }),
  })
  const run = (fn) => () => fn(editor.chain().focus()).run()

  return (
    <div role="toolbar" aria-label="Text formatting" className="flex flex-wrap items-center gap-0.5 rounded-t-xl border-b border-line bg-surface-alt p-1.5">
      <ToolbarButton label="Heading" icon={HeadingIcon} active={s.h3} onClick={run((c) => c.toggleHeading({ level: 3 }))} />
      <button type="button" aria-pressed={s.h4} onMouseDown={(e) => e.preventDefault()} onClick={run((c) => c.toggleHeading({ level: 4 }))} title="Subheading" className="h-9 rounded-lg px-2 font-heading text-sm font-bold text-ink-muted hover:bg-surface hover:text-secondary aria-pressed:bg-secondary aria-pressed:text-white">
        H4
      </button>
      <Divider />
      <ToolbarButton label="Bold" icon={BoldIcon} active={s.bold} onClick={run((c) => c.toggleBold())} />
      <ToolbarButton label="Italic" icon={ItalicIcon} active={s.italic} onClick={run((c) => c.toggleItalic())} />
      <ToolbarButton label="Underline" icon={UnderlineIcon} active={s.underline} onClick={run((c) => c.toggleUnderline())} />
      <LinkControl editor={editor} active={s.link} />
      <Divider />
      <ToolbarButton label="Bullet list" icon={ListIcon} active={s.bullet} onClick={run((c) => c.toggleBulletList())} />
      <ToolbarButton label="Numbered list" icon={ListOrderedIcon} active={s.ordered} onClick={run((c) => c.toggleOrderedList())} />
      <ToolbarButton label="Quote" icon={QuoteIcon} active={s.quote} onClick={run((c) => c.toggleBlockquote())} />
      <span className="ml-auto flex">
        <ToolbarButton label="Undo" icon={UndoIcon} disabled={!s.canUndo} onClick={run((c) => c.undo())} />
        <ToolbarButton label="Redo" icon={RedoIcon} disabled={!s.canRedo} onClick={run((c) => c.redo())} />
      </span>
    </div>
  )
}
