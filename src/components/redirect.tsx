import React from 'react';
import queryString from 'query-string';

export const Redirect = (props: {url: string}): null => {
    const {origin, pathname, search, hash} = window.location;

    const {otp, ...queryParams} = queryString.parse(search);
    const newSearch = queryString.stringify(queryParams);

    const next = `${origin}${pathname}${newSearch}${hash}`;

    setTimeout(() => {
        window.location.assign(`${props.url}?next=${encodeURIComponent(next)}`);
    }, 200); // 200 is the shortest interval that i tested that would reliably keep the page we're leaving
             // in chrome's browser history
    return null;
};