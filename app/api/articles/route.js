import prisma from "../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const articles = await prisma.article.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(
            {
                data: articles,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed fetch articles",
            },
            { status: 500 },
        );
    }
}

export async function POST(request) {
    try {
        const data = await request.json();

        const article = await prisma.article.create({
            data: {
                title: data.title.trim(),
                description: data.description?.trim(),
                content: data.content,
                featuredImage: data.featuredImage,
            },
        });

        return NextResponse.json(
            {
                message: "Article created",
                data: article,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "Failed create article",
            },
            { status: 500 },
        );
    }
}
