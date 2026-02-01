"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { useEffect } from "react";
import { X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";

export default function PreviewModal({ article, onClose }) {
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
        ],
        content: article.content,
        immediatelyRender: false,
        editable: false,
        editorProps: {
            attributes: {
                class: "p-6 bg-card text-lg leading-relaxed outline-none prose max-w-none",
            },
        },
    });
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/70" onClick={onClose} />
            <div className="relative w-full max-w-250 max-h-[90vh] bg-white rounded-2xl overflow-hidden flex flex-col">
                <div className="px-6 py-4 bg-gray-50 flex items-center justify-end shrink-0">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 bg-white border-2 border-divider rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                    >
                        <X size={20} strokeWidth={3} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-8 py-6">
                    <article className="max-w-200 mx-auto">
                        <div className="w-full h-75 bg-gray-200 flex items-center justify-center rounded-xl overflow-hidden mb-6">
                            {article.featuredImage ? (
                                <Image
                                    src={article.featuredImage}
                                    alt={article.title}
                                    width={800}
                                    height={400}
                                    className="w-full h-full object-cover"
                                    unoptimized
                                />
                            ) : (
                                <ImageIcon
                                    className="w-15 h-15 text-gray-400"
                                    strokeWidth={1.5}
                                />
                            )}
                        </div>
                        <h1 className="text-4xl font-black text-secondary-text mb-4 leading-tight">
                            {article.title}
                        </h1>

                        <p className="text-xl text-secondary-text mb-6 leading-relaxed">
                            {article.description}
                        </p>

                        <div className="flex items-center gap-4 mb text-sm text-secondary-text">
                            <span>
                                {new Date(article.createdAt).toLocaleDateString(
                                    "ru-RU",
                                )}
                            </span>
                        </div>
                        <EditorContent editor={editor} />
                    </article>
                </div>
            </div>
        </div>
    );
}
