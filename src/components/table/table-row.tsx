import { ComponentProps } from "react";

interface TableRowProps extends ComponentProps<'tr'> { }

export function TableRow({ className, ...rest }: TableRowProps) {
    return (
        <tr {...rest} className="border-b border-white/10" />
    )
}