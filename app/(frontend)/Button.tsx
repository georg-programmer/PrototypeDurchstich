import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	children: ReactNode;
	link?: string;
};

export default function Button({ children, className = "", link, ...props }: ButtonProps) {
	return (
		<a href={link ?? "#"}>
			<button
				className={`rounded bg-main px-1 py-0.5 text-white hover:bg-main/80 ${className}`}
				{...props}
			>
				{children}
			</button>
		</a>
	);
}
