import * as React from "react";

import { cn } from "@/src/utils/utils";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/src/components/ui/navigation-menu";
import { navContext } from "./nav";

export function Nav() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger className="bg-transparent">Pages</NavigationMenuTrigger>
					<NavigationMenuContent className="p-3 min-w-[150px]">
						<ul>
							{navContext.map(item => (
								<NavigationMenuItem key={item.title} className="w-full list-none">
									<ListItem title={item.title} href={item.href}>
										{item.href}
									</ListItem>
								</NavigationMenuItem>
							))}
						</ul>
						<div className="flex justify-end items-center mt-1">
							<a
								href="https://github.com/EdamAme-x"
								target="_blank"
								rel="noopener noreferrer"
								title="GitHub"
							>
								<img
									src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
									alt="GitHub"
									width={32}
									height={32}
									className="rounded-full mx-2 p-1 dark:filter dark:invert"
								/>
							</a>
							<a
								href="https://twitter.com/amex2189"
								target="_blank"
								rel="noopener noreferrer"
								title="Twitter"
							>
								<img
									src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
									alt="GitHub"
									width={32}
									height={32}
									className="rounded-full mx-2 p-1 dark:filter dark:invert"
								/>
							</a>
							<a href="https://zenn.dev/ame_x" target="_blank" rel="noopener noreferrer" title="Zeen">
								<img
									src="https://static.zenn.studio/images/logo-transparent.png"
									alt="GitHub"
									width={32}
									height={32}
									className="rounded-full mx-2 p-1"
								/>
							</a>
						</div>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
	({ className, title, children, ...props }, ref) => {
		return (
			<NavigationMenuLink asChild>
				<a
					ref={ref}
					className={cn(
						"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
						className,
					)}
					{...props}
				>
					<div className="text-sm font-bold leading-none">{title}</div>
					<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
				</a>
			</NavigationMenuLink>
		);
	},
);
ListItem.displayName = "ListItem";
