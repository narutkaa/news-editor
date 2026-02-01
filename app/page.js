import Header from "./components/Header";
import Card from "./components/Card";
import prisma from "./lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
    const articles = await prisma.article.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="max-h-screen">
            <Header />

            <main className="max-w-350 mx-auto px-6 py-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
                        <Card key={article.id} article={article} />
                    ))}
                </div>
            </main>
        </div>
    );
}
