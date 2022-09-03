/**
 * @param url
 * @param json
 * @returns {Promise<any>}
 */
const GET = async ({ url, json = true }) => {
    const res = await fetch(url);
    if (json) return await res.json();
    return await res.text();
};

/**
 * @param url
 * @param body
 * @param contentType
 * @returns {Promise<any>}
 */
const POST = async ({ url, body = {}, contentType = "application/json" }) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-type": contentType },
        body: JSON.stringify(body)
    });

    return await res.json();
};

/**
 * @param url
 * @param body
 * @param contentType
 * @returns {Promise<any>}
 */
const PUT = async ({ url, body = {}, contentType = "application/json" }) => {
    const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-type": contentType },
        body: JSON.stringify(body)
    });

    return await res.json();
};

/**
 * @param url
 * @param body
 * @param contentType
 * @returns {Promise<any>}
 */
const DELETE = async ({ url, body = {}, contentType = "application/json" }) => {
    const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-type": contentType },
        body: JSON.stringify(body)
    });

    return await res.json();
};

/**
 * @param identifier
 * @param setState
 * @param dataUrl
 * @param params
 */
const loadDataFromServer = (identifier, setState, dataUrl, params = {}) => {
    if (dataUrl === '') return;

    const load = async (identifier, setState, dataUrl) => {
        const url = new URL(dataUrl + identifier);

        const keys = Object.keys(params);
        for (const key of keys) {
            url.searchParams.set(key, params[key]);
        }

        url.searchParams.set("i", Math.floor(Math.random() * 1000).toString())

        const data = await GET({url: url.toString()});
        setState(data);
    };

    load(identifier, setState, dataUrl).then(() => console.log(`${identifier} data loaded`));
};

export { GET, POST, PUT, DELETE, loadDataFromServer };