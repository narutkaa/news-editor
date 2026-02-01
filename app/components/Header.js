import Link from "next/link";
import { Bell, Plus } from "lucide-react";

export default function Header({ hideAction = false }) {
    return (
        <header className="border-b-2 border-divider bg-header sticky top-0 z-50">
            <div className="max-w-350 mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary border-2 border-divider rounded-lg flex items-center justify-center">
                        <span className="text-white text-xl font-bold ">N</span>
                    </div>
                    <h1 className="text-2xl font-black ">News Editor</h1>
                </Link>
                <div className="flex items-center gap-4 ">
                    {!hideAction && (
                        <Link
                            href="/editor"
                            className="flex items-center gap-2 px-6 py-2 bg-primary border-2 border-divider hover:bg-primary-hover text-white font-bold rounded-xl"
                        >
                            <Plus size={20} strokeWidth={3} />
                            <span className="hidden sm:inline">Создать статью</span>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}
