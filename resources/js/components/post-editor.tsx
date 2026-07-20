import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Code,
    Heading2,
    Heading3,
    Image as ImageIcon,
    Italic,
    Link as LinkIcon,
    List,
    ListOrdered,
    Quote,
    Strikethrough,
    Underline as UnderlineIcon,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { Button } from '@/components/ui/button';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';

type ToolbarButtonProps = {
    label: string;
    icon: ComponentType<{ className?: string }>;
    isActive?: boolean;
    onClick: () => void;
};

function ToolbarButton({ label, icon: Icon, isActive, onClick }: ToolbarButtonProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label={label}
                    aria-pressed={isActive}
                    onClick={onClick}
                    className={
                        isActive
                            ? 'bg-accent text-accent-foreground'
                            : 'text-muted-foreground hover:text-foreground'
                    }
                >
                    <Icon className="size-4" />
                </Button>
            </TooltipTrigger>
            <TooltipContent>{label}</TooltipContent>
        </Tooltip>
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
            Image.configure({
                HTMLAttributes: {
                    class: 'rounded-md',
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

        editor.chain().focus().setImage({ src: url }).run();
    };

    return (
        <div className="grid gap-2">
            <div className="flex flex-wrap items-center gap-0.5 rounded-md border border-input bg-muted/30 p-1">
                <ToolbarButton
                    label="Bold"
                    icon={Bold}
                    isActive={editor.isActive('bold')}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                />
                <ToolbarButton
                    label="Italic"
                    icon={Italic}
                    isActive={editor.isActive('italic')}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                />
                <ToolbarButton
                    label="Underline"
                    icon={UnderlineIcon}
                    isActive={editor.isActive('underline')}
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                />
                <ToolbarButton
                    label="Strikethrough"
                    icon={Strikethrough}
                    isActive={editor.isActive('strike')}
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                />

                <span className="mx-1 h-5 w-px bg-border" />

                <ToolbarButton
                    label="Heading 2"
                    icon={Heading2}
                    isActive={editor.isActive('heading', { level: 2 })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                />
                <ToolbarButton
                    label="Heading 3"
                    icon={Heading3}
                    isActive={editor.isActive('heading', { level: 3 })}
                    onClick={() =>
                        editor
                            .chain()
                            .focus()
                            .toggleHeading({ level: 3 })
                            .run()
                    }
                />

                <span className="mx-1 h-5 w-px bg-border" />

                <ToolbarButton
                    label="Bullet list"
                    icon={List}
                    isActive={editor.isActive('bulletList')}
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                />
                <ToolbarButton
                    label="Numbered list"
                    icon={ListOrdered}
                    isActive={editor.isActive('orderedList')}
                    onClick={() =>
                        editor.chain().focus().toggleOrderedList().run()
                    }
                />
                <ToolbarButton
                    label="Quote"
                    icon={Quote}
                    isActive={editor.isActive('blockquote')}
                    onClick={() =>
                        editor.chain().focus().toggleBlockquote().run()
                    }
                />
                <ToolbarButton
                    label="Code block"
                    icon={Code}
                    isActive={editor.isActive('codeBlock')}
                    onClick={() =>
                        editor.chain().focus().toggleCodeBlock().run()
                    }
                />

                <span className="mx-1 h-5 w-px bg-border" />

                <ToolbarButton
                    label="Link"
                    icon={LinkIcon}
                    isActive={editor.isActive('link')}
                    onClick={setLink}
                />
                <ToolbarButton label="Image" icon={ImageIcon} onClick={setImage} />
            </div>

            <EditorContent editor={editor} />

            {error && <p className="text-destructive text-sm">{error}</p>}
        </div>
    );
}
