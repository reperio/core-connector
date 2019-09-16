import { QueryParameters } from "../models/queryParameters";

export class UtilitiesService {
    public encodeQueryParameters(queryParameters: QueryParameters): string {
        const queryStringParts: string[] = [];
        if (queryParameters.page != null) {
            queryStringParts.push(`page=${encodeURIComponent(queryParameters.page.toString())}`);
        }
        if (queryParameters.pageSize != null) {
            queryStringParts.push(`pageSize=${encodeURIComponent(queryParameters.pageSize.toString())}`);
        }
        // if (queryParameters.take != null) {
        //     queryStringParts.push(`take=${encodeURIComponent(queryParameters.take.toString())}`);
        // }
        // if (queryParameters.skip != null) {
        //     queryStringParts.push(`skip=${encodeURIComponent(queryParameters.skip.toString())}`);
        // }
        if (queryParameters.sort != null) {
            for (let i = 0; i < queryParameters.sort.length; ++i) {
                queryStringParts.push(`sort[${i}].id=${encodeURIComponent(queryParameters.sort[i].id)}`);
                if (queryParameters.sort[i].desc != null) {
                    queryStringParts.push(`sort[${i}].desc=${encodeURIComponent(queryParameters.sort[i].desc.toString())}`);
                }
            }
        }
        // if (queryParameters.filter != null) {
        //     queryStringParts.push(...this.getQueryStringForFilter(queryParameters.filter, "filter"));
        // }

        return queryStringParts.join("&");
    }

    // private getQueryStringForFilter(filterQueryParameter: any, queryStringParameterPrefix: string): string[] {
    //     const queryStringParts: string[] = [];
    //     if (filterQueryParameter.hasOwnProperty("logic")) {
    //         queryStringParts.push(`${queryStringParameterPrefix}[logic]=${encodeURIComponent(filterQueryParameter.logic)}`);
    //         for (let i = 0; i < filterQueryParameter.filters.length; ++i) {
    //             queryStringParts.push(...this.getQueryStringForFilter(filterQueryParameter.filters[i], `${queryStringParameterPrefix}[filters][${i}]`));
    //         }
    //     } else {
    //         queryStringParts.push(`${queryStringParameterPrefix}[field]=${encodeURIComponent(filterQueryParameter.field)}`);
    //         queryStringParts.push(`${queryStringParameterPrefix}[operator]=${encodeURIComponent(filterQueryParameter.operator)}`);

    //         let value = filterQueryParameter.value;
    //         if (value.toISOString != null) {
    //             value = value.toISOString();
    //         }
    //         queryStringParts.push(`${queryStringParameterPrefix}[value]=${encodeURIComponent(value)}`);
    //     }

    //     return queryStringParts;
    // }
}