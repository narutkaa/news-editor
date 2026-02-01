"use client";

import { Edit2, Trash2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PreviewModal from "./PreviewModal";
import { useRouter } from "next/navigation";

export default function Card({ article }) {
    const [showPreview, setShowPreview] = useState(false);
    const router = useRouter();

    const handleDelete = async (id) => {
        if (!confirm("Удалить?")) return;

        const res = await fetch(`/api/articles/${id}`, { method: "DELETE" });

        if (res.ok) {
            router.refresh();
        }
    };

    return (
        <>
            <div
                onClick={() => setShowPreview(true)}
                className="w-full max-w-100 bg-card border-2 border-divider hover:bg-card-hover rounded-2xl hover:translate-x-px hover:translate-y-px transition-all overflow-hidden"
            >
                <div className="w-full h-55 bg-gray-200 overflow-hidden flex items-center justify-center">
                    {article.featuredImage ? (
                        <img
                            src={article.featuredImage}
                            alt={article.title}
                            width={800}
                            height={400}
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                    ) : (
                        <ImageIcon
                            className="w-12 h-12 text-gray-400"
                            strokeWidth={1.5}
                        />
                    )}
                </div>

                <div className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">
                        {article.title}
                    </h3>
                    <p className="text-sm text-main mb-1 line-clamp-2">
                        {article.description}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                        <p className="text-xs text-secondary-text">
                            {new Date(article.createdAt).toLocaleDateString(
                                "ru-RU",
                            )}
                        </p>

                        <div
                            className="flex gap-2"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Link
                                href={"/editor/" + article.id}
                                className="w-9 h-9 rounded-lg border-2 border-divider hover:bg-orange-200 transition-colors flex items-center justify-center"
                                title="Редактировать"
                            >
                                <Edit2 size={16} strokeWidth={3} />
                            </Link>

                            <button
                                onClick={() => handleDelete(article.id)}
                                className="w-9 h-9 border-2 border-divider rounded-lg hover:bg-red-200 transition-colors flex items-center justify-center"
                                title="Удалить"
                            >
                                <Trash2 size={16} strokeWidth={3} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPreview && (
                <PreviewModal
                    article={article}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
}
