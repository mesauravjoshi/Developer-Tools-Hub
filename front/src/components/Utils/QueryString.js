export const QueryString = (query) => {

    const validParams = updatedParams
        .filter(param => param.enabled && param.key.trim() !== '')
        .map(param =>
            `${encodeURIComponent(param.key.length > 0 ? param.key : 'a')}=${encodeURIComponent(param.value)}`
        );
    const queryString = validParams.length ? `?${validParams.join('&')}` : '';
    return queryString;
}