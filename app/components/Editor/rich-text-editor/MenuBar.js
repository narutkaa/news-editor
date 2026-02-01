import {
    ArrowLeft,
    Save,
    TextAlignStart,
    TextAlignCenter,
    TextAlignEnd,
    TextAlignJustify,
    Eye,
    Upload,
    X,
    Bold,
    Italic,
    List,
    ListOrdered,
    Quote,
    Heading1,
    Heading2,
    Pilcrow,
    Image as ImageIcon,
    FileText,
} from "lucide-react";
import EditorButton from "./EditorButton";

export default function MenuBar({ editor }) {

    if (!editor) {
        return null;
    }


    return (
        <div className="mb-4 p-3 bg-card border border-border rounded-lg flex items-center gap-1 flex-wrap">
            <EditorButton
                isActive={editor.isActive("heading", { level: 1 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                title="Заголовок 1"
            >
                <Heading1 size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive("heading", { level: 2 })}
                onClick={() =>
                    editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                title="Заголовок 2"
            >
                <Heading2 size={20} strokeWidth={2.5} />
            </EditorButton>

            <div className="w-px h-6 bg-divider mx-1" />

            <EditorButton
                isActive={editor.isActive("paragraph")}
                onClick={() => editor.chain().focus().setParagraph().run()}
                title="Абзац"
            >
                <Pilcrow size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive("bulletList")}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                title="Маркированный список"
            >
                <List size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive("orderedList")}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                title="Нумерованный список"
            >
                <ListOrdered size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive("blockquote")}
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                title="Цитата"
            >
                <Quote size={20} strokeWidth={2.5} />
            </EditorButton>

            <div className="w-px h-6 bg-divider mx-1" />

            <EditorButton
                isActive={editor.isActive("bold")}
                onClick={() => editor.chain().focus().toggleBold().run()}
                title="Жирный текст (Ctrl+B)"
            >
                <Bold size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive("italic")}
                onClick={() => editor.chain().focus().toggleItalic().run()}
                title="Курсив (Ctrl+I)"
            >
                <Italic size={20} strokeWidth={2.5} />
            </EditorButton>

            <div className="w-px h-6 bg-divider mx-1" />

            <EditorButton
                isActive={editor.isActive({ textAlign: "left" })}
                onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                }
                title="Выравнивание по левому краю"
            >
                <TextAlignStart size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive({ textAlign: "center" })}
                onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                }
                title="Выравнивание по центру"
            >
                <TextAlignCenter size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive({ textAlign: "right" })}
                onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                }
                title="Выравнивание по правому краю"
            >
                <TextAlignEnd size={20} strokeWidth={2.5} />
            </EditorButton>

            <EditorButton
                isActive={editor.isActive({ textAlign: "justify" })}
                onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                }
                title="Выравнивание по ширине"
            >
                <TextAlignJustify size={20} strokeWidth={2.5} />
            </EditorButton>
        </div>
    );
}
