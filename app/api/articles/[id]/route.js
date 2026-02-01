import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    try {
        const { id } = await params;
        const articleId = Number(id);

        if (isNaN(articleId)) {
            return NextResponse.json(
                { error: "Invalid ID" },
                { status: 400 },
            );
        }

        const data = await request.json();

        const updatedArticle = await prisma.article.update({
            where: { id: articleId },
            data: {
                title: data.title.trim(),
                description: data.description?.trim() || null,
                content: data.content,
                featuredImage: data.featuredImage,
            },
        });
        return NextResponse.json(
            {
                message: "Article updated",
                data: updatedArticle,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed update article",
            },
            { status: 500 },
        );
    }
}

export async function DELETE(request, { params }) {
    try {
        const { id } = await params;
        const articleId = Number(id);

        if (isNaN(articleId)) {
            return NextResponse.json(
                { error: "Invalid ID" },
                { status: 400 },
            );
        }

        await prisma.article.delete({
            where: { id: articleId },
        });

        return NextResponse.json(
            {
                message: "Article deleted",
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed delete article",
            },
            { status: 500 },
        );
    }
}
