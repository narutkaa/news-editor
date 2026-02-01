"use client";

import {X, Image as ImageIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import PreviewModal from "../PreviewModal";
import RichTextEditor from "./rich-text-editor/TextArea";
import Header from "../Header";

export default function EditorForm({ mode = "create", initialData = {} }) {
    const router = useRouter();

    const [title, setTitle] = useState(initialData.title || "");
    const [content, setContent] = useState(initialData.content || "");
    const [description, setDescription] = useState(
        initialData.description || "",
    );
    const [showPreview, setShowPreview] = useState(false);

    const [imageUrl, setImageUrl] = useState(initialData.featuredImage ?? null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        return () => {
            if (imagePreview?.startsWith("blob:"))
                URL.revokeObjectURL(imagePreview);
        };
    }, [imagePreview]);

    const onChange = (content) => {
        setContent(content);
    };

    const previewArticle = {
        id: initialData.id || "new",
        title: title || "Без названия",
        content: content || "",
        description: description || "",
        featuredImage: imagePreview || imageUrl || null,
        date: new Date().toLocaleDateString("ru-RU"),
        createdAt: initialData.createdAt || new Date().toISOString(),
    };

    const pickImage = () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.onchange = (event) => {
            const file = event.target.files?.[0];
            if (!file) return;

            if (file.size > 5 * 1024 * 1024) {
                alert("Файл слишком большой. Максимум 5MB.");
                return;
            }

            // revoke old preview
            if (imagePreview?.startsWith("blob:"))
                URL.revokeObjectURL(imagePreview);

            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        };

        input.click();
    };

    const removeImage = () => {
        if (imagePreview?.startsWith("blob:"))
            URL.revokeObjectURL(imagePreview);
        setImagePreview(null);
        setImageFile(null);
        setImageUrl(null);
    };

    const handlePublish = async () => {
        if (!title.trim() || !content.trim()) return alert("Заполните поля");

        try {
            let finalUrl = imageUrl;

            // img new -> upload
            if (imageFile) {
                const fd = new FormData();
                fd.append("file", imageFile);

                const upRes = await fetch("/api/upload", {
                    method: "POST",
                    body: fd,
                });
                const upJson = await upRes.json();

                if (!upRes.ok) {
                    throw new Error(upJson.message || "Upload failed");
                }

                finalUrl = upJson.url;
            }

            const payload = {
                title: title.trim(),
                description: description.trim() || null,
                content,
                featuredImage: finalUrl,
            };

            const isEdit = mode === "edit" && initialData.id;
            const res = await fetch(
                isEdit ? `/api/articles/${initialData.id}` : "/api/articles",
                {
                    method: isEdit ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                },
            );

            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.message || json.error || "Save failed");
            }

            // синхронизируем состояние картинки
            if (imagePreview?.startsWith("blob:"))
                URL.revokeObjectURL(imagePreview);
            setImagePreview(null);
            setImageFile(null);
            setImageUrl(json.data.featuredImage ?? null);

            router.push("/");
            router.refresh();
        } catch (e) {
            alert(`Ошибка: ${e.message}`);
        }
    };

    return (
        <>
            <Header hideAction={true} />

            <main className="max-w-350 mx-auto px-6 py-8">
                <div className="flex gap-6">
                    {/* left side */}
                    <div className="flex-1 max-w-[70%]">
                        <input
                            type="text"
                            placeholder="Заголовок статьи"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full text-3xl font-heading mb-3 px-2 outline-none focus:outline-none bg-transparent placeholder:placeholder"
                        />

                        <input
                            type="text"
                            placeholder="Описание статьи"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full text-lg font-heading mb-3 px-2 outline-none focus:outline-none bg-transparent placeholder:placeholder"
                        />
                        <RichTextEditor content={content} onChange={onChange} />
                    </div>

                    {/* right side */}
                    <div className="w-[30%] shrink-0 space-y-6">
                        <div className="bg-header rounded-xl border-2 border-divider overflow-hidden">
                            <div className="p-4">
                                {imagePreview || imageUrl ? (
                                    <div className="space-y-3">
                                        {/* preview */}
                                        <div className="relative">
                                            <Image
                                                src={imagePreview || imageUrl}
                                                alt="Главное изображение"
                                                width={300}
                                                height={200}
                                                className="w-full h-48 object-cover rounded-lg"
                                            />
                                            <button
                                                onClick={removeImage}
                                                className="absolute top-2 right-2 w-8 h-8 bg-red-200 text-white rounded-full flex items-center justify-center hover:bg-red-500 transition-colors"
                                                title="Удалить изображение"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>

                                        {imageFile ? (
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="font-medium text-sm truncate">
                                                    {imageFile.name}
                                                </p>
                                                <p className="text-xs text-gray-600">
                                                    {(
                                                        imageFile.size /
                                                        1024 /
                                                        1024
                                                    ).toFixed(2)}{" "}
                                                    MB
                                                </p>
                                            </div>
                                        ) : imageUrl ? (
                                            <div className="bg-white rounded-lg p-3">
                                                <p className="font-medium text-sm truncate">
                                                    Текущее изображение
                                                </p>
                                                <p className="text-xs text-secondary-text truncate">
                                                    {imageUrl}
                                                </p>
                                            </div>
                                        ) : null}
                                    </div>
                                ) : (
                                    <div
                                        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer"
                                        onClick={pickImage}
                                    >
                                        <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-600 mb-2">
                                            Нажмите для загрузки фото
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={pickImage}
                                    className="w-full mt-4 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors flex items-center justify-center gap-2"
                                >
                                    {imagePreview || imageUrl ? (
                                        <>
                                            <span className="hidden sm:inline">
                                                Заменить изображение
                                            </span>
                                        </>
                                    ) : (
                                        <>
                                            <span className="hidden sm:inline">
                                                Загрузить изображение
                                            </span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="p-4 bg-header rounded-xl border-2 border-divider space-y-2">
                            <button
                                onClick={() => setShowPreview(true)}
                                className="w-full py-3 bg-secondary font-bold rounded-xl hover:bg-secondary-hover transition-colors"
                            >
                                Предпросмотр
                            </button>
                            <button
                                onClick={handlePublish}
                                className="w-full py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-hover transition-colors"
                            >
                                Опубликовать
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {showPreview && (
                <PreviewModal
                    article={previewArticle}
                    onClose={() => setShowPreview(false)}
                />
            )}
        </>
    );
}
