const urlSearchParams = new URLSearchParams(window.location.search);
const queryParams: Record<string, string> = {};

for (const [key, value] of urlSearchParams.entries()) {
    queryParams[key] = value;
}

export { queryParams };

