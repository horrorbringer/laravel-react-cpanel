import type { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src="/apple-touch-icon.png"
            alt="Logo"
            width={undefined}
            {...props}
            className={`h-8 w-auto ${props.className ?? ''}`}
        />
    );
}
