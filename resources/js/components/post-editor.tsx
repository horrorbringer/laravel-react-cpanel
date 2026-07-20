import Link from '@tiptap/extension-link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Button } from '@/components/ui/button';


type ToolbarButtonProps = {
    label: string;
    isActive?: boolean;
    onClick: () => void;
};

function ToolbarButton({ label, isActive, onClick }: ToolbarButtonProps) {
    return (
        <Button
            type="button"
            variant={isActive ? 'default' : 'outline'}
            size="sm"
            onClick={onClick}
            className="h-8 px-2"
        >
            {label}
        </Button>
    );
}

type PostEditorProps = {
    value?: string;
    onChange: (html: string) => void;
    error?: string;
};

export default function PostEditor({
    value,
    onChange,
    error,
}: PostEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: 'text-primary underline underline-offset-2',
                    rel: 'noopener noreferrer',
                },
            }),
        ],
        content: value ?? '',
        editorProps: {
            attributes: {
                class:
                    'prose prose-sm dark:prose-invert max-w-none min-h-48 rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
    });

    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previous = editor.getAttributes('link').href as string | undefined;
        const url = window.prompt('Link URL', previous ?? 'https://');

        if (url === null) {
            return;
        }

        if (url === '') {
            editor.chain().focus().extendMarkRange('link').unsetLink().run();

            return;
        }

        editor
            .chain()
            .focus()
            .extendMarkRange('link')
            .setLink({ href: url })
            .run();
    };

    const setImage = () => {
        const url = window.prompt('Image URL', 'https://');

        if (!url) {
            return;
        }

        (editor.chain().focus() as unknown as {
            setImage: (attrs: { src: string }) => { run: () => void };
        })
            .setImage({ src: url })
            .run();
    };

    return (
        <div className="grid gap-2">
            <div className="flex flex-wrap gap-1.5">
                <ToolbarButton
                    label="Bold"
                    isActive={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />
                <ToolbarButton
                    label="Italic"
                    isActive={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <ToolbarButton
                    label="Strike"
                    isActive={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                />
                <ToolbarButton
                    label="H2"
                    isActive={editor.isActive('heading', { level: 2 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                />
                <ToolbarButton
                    label="H3"
                    isActive={editor.isActive('heading', { level: 3 })}
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 3 }).run()
                    }
                />
                <ToolbarButton
                    label="Bullet"
                    isActive={editor.isActive('bulletList')}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                />
                <ToolbarButton
                    label="Numbered"
                    isActive={editor.isActive('orderedList')}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                />
                <ToolbarButton
                    label="Quote"
                    isActive={editor.isActive('blockquote')}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                />
                <ToolbarButton
                    label="Code"
                    isActive={editor.isActive('codeBlock')}
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                />
                <ToolbarButton
                    label="Link"
                    isActive={editor.isActive('link')}
                    onClick={setLink}
                />
                <ToolbarButton label="Image" onClick={setImage} />
            </div>

            <EditorContent editor={editor} />

            {error && (
                <p className="text-destructive text-sm">{error}</p>
            )}
        </div>
    );
}
