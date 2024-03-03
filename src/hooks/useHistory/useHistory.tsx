import { useEffect, useState } from "react"

const useHistory = () => {
    const [history, setHistory] = useState<string[]>([]);

    useEffect(() => {
        const obj = JSON.parse(localStorage.getItem('query') as string) || {};

        const keys = Object.keys(obj);

        setHistory(keys);
    }, [])

    return history;
}

export default useHistory