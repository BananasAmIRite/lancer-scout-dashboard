import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface TableEntryQuery {
    name: string;
    id: number;
}

export interface AllEntriesQuery {
    name: string;
}

export function isTableEntryQuery(query: any): query is TableEntryQuery {
    return 'name' in query && 'id' in query;
}

export function isAllEntriesQuery(query: any): query is AllEntriesQuery {
    return 'name' in query;
}

export const ScoutAPI = createApi({
    reducerPath: 'scoutApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/pokemon/venusaur' }),
    endpoints: (builder) => ({
        getTableEntryById: builder.query({
            query: ({ name, id }: TableEntryQuery) => ({
                url: '/', // `/fetchTable?id=${id}&name=${name}`,
                method: 'GET',
            }),
        }),
        getAllEntries: builder.query({
            query: ({ name }: AllEntriesQuery) => ({
                url: `/fetchAllEntires?name=${name}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetTableEntryByIdQuery, useGetAllEntriesQuery } = ScoutAPI;
