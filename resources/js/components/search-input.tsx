import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

type Props = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function SearchInput({ value, onChange, placeholder = 'Search' }: Props) {
    return (
        <div className="relative w-full">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
                type="search"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="pl-9"
                aria-label={placeholder}
            />
        </div>
    );
}
