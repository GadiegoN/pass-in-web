import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

interface TableCellProps extends ComponentProps<'td'> { }

export function TableCell({ className, ...rest }: TableCellProps) {
    return (
        <td {...rest} className={twMerge("py-3 px-4 text-sm text-zinc-200", className)} />
    )
}