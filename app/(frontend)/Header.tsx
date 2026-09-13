import type { ReactNode } from "react";

type HeaderProps = {
	children: ReactNode;
};

export default function Header({ children }: HeaderProps) {
	return <header className="text-2xl my-4 text-black">{children}</header>;
}

