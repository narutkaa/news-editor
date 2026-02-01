"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import MenuBar from "./MenuBar";
import Image from "@tiptap/extension-image";
import "./style.css";

export default function RichTextEditor({ content, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                bulletList: {
                    HTMLAttributes: {
                        class: "list-disc ml-3",
                    },
                },
                orderedList: {
                    HTMLAttributes: {
                        class: "list-decimal ml-3",
                    },
                },
                paragraph: {
                    HTMLAttributes: {
                        class: "indent-8 mb-4",
                    },
                },
                blockquote: {
                    HTMLAttributes: {
                        class: "border-l-2 border-gray-300 my-6 pl-4",
                    },
                },
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
            Image.configure({
                inline: false,
                resize: {
                    enabled: true,
                    directions: ["top", "bottom", "left", "right"],
                    minWidth: 50,
                    minHeight: 50,
                    alwaysPreserveAspectRatio: true,
                },
            }),
        ],
        content: content,
        immediatelyRender: false,
        editorProps: {
            attributes: {
                class:
                    "p-6 bg-card text-lg leading-relaxed outline-none prose max-w-none",
            },
        },

        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    return (
        <div>
            <MenuBar editor={editor} />
            <EditorContent
                editor={editor}
                className="border border-border rounded-lg h-105 overflow-y-auto"
            />
        </div>
    );
}
