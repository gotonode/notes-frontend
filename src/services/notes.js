import axios from "axios"

const baseUrl = "http://192.168.100.208:3001/notes"

const getAll = () => {
    const request = axios.get(baseUrl)
    const nonExisting = {
        id: 10000,
        content: "Doesn't exist",
        date: "1970",
        important: true
    }
    return request.then(response => response.data.concat(nonExisting))
}

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)

    // TODO: Log the response data somehow.
    return request.then(response => response.data)
}

export default { getAll, create, update }