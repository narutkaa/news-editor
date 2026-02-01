import prisma from "../../lib/prisma";
import EditorForm from "../../components/Editor/EditorForm";

export default async function EditArticlePage({ params }) {
    const { id } = await params;

    const article = await prisma.article.findUnique({
        where: { id: Number(id) },
    });

    return <EditorForm mode="edit" initialData={article} />;
}
