export default function EditorButton({
    isActive,
    onClick,
    title,
    children,
    activeClass = "",
    inactiveClass = "",
}) {
    return (
        <button
            onClick={onClick}
            className="w-10 h-10 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors"
            title={title}
        >
            {children}
        </button>
    );
}
