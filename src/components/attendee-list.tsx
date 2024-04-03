import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreHorizontal, Search } from "lucide-react";
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/pt-br"
import { IconButton } from "./icon-button";
import { Table } from "./table/table";
import { TableHeader } from "./table/table-header";
import { TableCell } from "./table/table-cell";
import { TableRow } from "./table/table-row";
import { ChangeEvent, useEffect, useState } from "react";

dayjs.extend(relativeTime)
dayjs.locale('pt-br')

interface AttendeeArray {
    id: string
    name: string
    email: string
    createdAt: string
    checkedInAt: string | null
}

export function AttendeeList() {
    const [search, setSearch] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('search')) {
            return url.searchParams.get('search') ?? ''
        }

        return ''
    })
    const [page, setPage] = useState(() => {
        const url = new URL(window.location.toString())

        if (url.searchParams.has('page')) {
            return Number(url.searchParams.get('page'))
        }

        return 1
    })

    const [total, setTotal] = useState(0)
    const [attendees, setattendees] = useState<AttendeeArray[]>([])

    const totalPages = Math.ceil(total / 10);

    useEffect(() => {
        const url = new URL('http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees')
        url.searchParams.set('pageIndex', String(page - 1))

        if (search.length > 0) {
            url.searchParams.set('query', search)
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                setattendees(data.attendees)
                setTotal(data.total)
            })
    }, [page, search])

    function setCurrentSearch(search: string) {
        const url = new URL(window.location.toString())

        url.searchParams.set('search', search)
        window.history.pushState({}, "", url)

        setSearch(search)
    }

    function setCurrentPage(page: number) {
        const url = new URL(window.location.toString())

        url.searchParams.set('page', String(page))
        window.history.pushState({}, "", url)

        setPage(page)
    }

    function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
        setCurrentSearch(event.target.value)
        setPage(1)
    }


    function goToFirstPage() {
        setCurrentPage(1)
    }

    function goToPreviousPage() {
        setCurrentPage(page - 1)
    }

    function goToNextPage() {
        setCurrentPage(page + 1)
    }

    function goToLastPage() {
        setCurrentPage(totalPages)
    }

    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold">Participantes</h1>
                <div className="px-3 py-1.5 w-72 rounded-lg border border-white/30 flex justify-center items-center gap-3">
                    <Search className="size-4 text-emerald-300" />
                    <input
                        type="text"
                        placeholder="Buscar participantes"
                        className="bg-transparent flex-1 outline-none h-auto border-0 p-0 text-sm focus:ring-0"
                        value={search}
                        onChange={onSearchInputChanged}
                    />
                </div>
            </div>

            <Table>
                <thead>
                    <TableRow>
                        <TableHeader style={{ width: 48 }}>
                            <input type="checkbox" className="bg-black/20 size-4 rounded-[4px] border-white/10 checked:bg-orange-600 focus-visible:outline-offset-0 focus-visible:outline-none focus:text-orange-400 focus:ring-0 focus:ring-offset-0" name="" id="" />
                        </TableHeader>
                        <TableHeader>
                            <p>Código</p>
                        </TableHeader>
                        <TableHeader>
                            <p>Participantes</p>
                        </TableHeader>
                        <TableHeader>
                            <p>Data de inscrição</p>
                        </TableHeader>
                        <TableHeader>
                            <p>Data do check-in</p>
                        </TableHeader>
                        <TableHeader style={{ width: 64 }}>
                            <p>actions</p>
                        </TableHeader>
                    </TableRow>
                </thead>

                <tbody>
                    {attendees.map((attendee) => {
                        return (
                            <TableRow key={attendee.id}>
                                <TableCell>
                                    <input
                                        type="checkbox"
                                        className="bg-black/20 size-4 rounded-[4px] border-white/10 checked:bg-orange-600 focus-visible:outline-offset-0 focus-visible:outline-none focus:text-orange-400 focus:ring-0 focus:ring-offset-0"
                                        name=""
                                        id=""
                                    />
                                </TableCell>
                                <TableCell>
                                    <p>{attendee.id}</p>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-col gap-1">
                                        <p>{attendee.name}</p>
                                        <p className="font-semibold text-zinc-400">{attendee.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p>{dayjs().to(attendee.createdAt)}</p>
                                </TableCell>
                                <TableCell>
                                    <p>{attendee.checkedInAt === null ? <span className="text-zinc-500">Não fez checkin</span> : dayjs().to(attendee.checkedInAt)}</p>
                                </TableCell>
                                <TableCell>
                                    <IconButton transparent>
                                        <MoreHorizontal className="size-4" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </tbody>

                <tfoot>
                    <TableRow>
                        <TableCell colSpan={3}>
                            Mostrando {attendees.length} de {total} items
                        </TableCell>
                        <TableCell colSpan={3} className="text-right">
                            <div className="inline-flex items-center gap-8">
                                <span>Página {page} de {totalPages}</span>
                                <div className="flex gap-1.5">
                                    <IconButton onClick={goToFirstPage} disabled={page === 1}>
                                        <ChevronsLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                                        <ChevronLeft className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToNextPage} disabled={page === totalPages}>
                                        <ChevronRight className="size-4" />
                                    </IconButton>
                                    <IconButton onClick={goToLastPage} disabled={page === totalPages}>
                                        <ChevronsRight className="size-4" />
                                    </IconButton>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                </tfoot>
            </Table>
        </div>
    )
}