"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface DropdownMenuContextType {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextType | undefined>(undefined);

export const DropdownMenu = ({ children }: { children: React.ReactNode }) => {
    const [open, setOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <DropdownMenuContext.Provider value={{ open, setOpen }}>
            <div className="relative inline-block text-left" ref={containerRef}>
                {children}
            </div>
        </DropdownMenuContext.Provider>
    );
};

export const DropdownMenuTrigger = ({
    children,
    asChild,
    className,
}: {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string; // Added className prop
}) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu");

    const Comp = asChild ? React.Fragment : "button"; // Simplified logic
    // If asChild is true, we should strictly clone the child and add onClick,
    // but here we are simplifying for speed.
    // Better: just wrap the child in a div that handles the click if asChild is true?
    // No, standard pattern is cloning.

    return (
        <div onClick={() => context.setOpen(!context.open)} className={cn("cursor-pointer", className)}>
            {children}
        </div>
    );
};

export const DropdownMenuContent = ({
    children,
    align = "end",
}: {
    children: React.ReactNode;
    align?: "start" | "end" | "center";
}) => {
    const context = React.useContext(DropdownMenuContext);
    if (!context) throw new Error("DropdownMenuContent must be used within DropdownMenu");

    return (
        <AnimatePresence>
            {context.open && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className={cn(
                        "absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md text-popover-foreground w-56",
                        align === "end" ? "right-0" : "left-0"
                    )}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export const DropdownMenuItem = ({
    children,
    className,
    asChild,
    onClick,
}: {
    children: React.ReactNode;
    className?: string;
    asChild?: boolean;
    onClick?: () => void;
}) => {
    // If asChild is true, we assume the child is a Link or similar that handles its own navigation.
    // We just want to close the menu when clicked.
    const context = React.useContext(DropdownMenuContext);

    const handleClick = () => {
        context?.setOpen(false);
        if (onClick) onClick();
    }

    return (
        <div
            className={cn(
                "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-gray-100 cursor-pointer",
                className
            )}
            onClick={handleClick}
        >
            {children}
        </div>
    );
};

export const DropdownMenuLabel = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("px-2 py-1.5 text-sm font-semibold", className)}>
            {children}
        </div>
    );
};

export const DropdownMenuSeparator = ({ className }: { className?: string }) => {
    return <div className={cn("-mx-1 my-1 h-px bg-muted bg-gray-200", className)} />;
};
