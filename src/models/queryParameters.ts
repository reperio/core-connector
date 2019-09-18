
interface QueryParameters {
    page: number,
    pageSize: number,
    sort: Sort[],
    filter: Filter[]
}

interface Sort {
    id: string,
    desc: boolean
}

interface Filter {
    id: string,
    value: string
}

export { QueryParameters, Sort, Filter }