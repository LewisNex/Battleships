import { useState, useEffect, useRef } from 'react';

export enum FetchResultType {
	Success,
	Error,
	Loading
}

type SuccessfulFetch<T> = {
	type: FetchResultType.Success,
	result: T
};

type ErroredFetch = {
	type: FetchResultType.Error,
	message: string
};

type LoadingFetch = {
	type: FetchResultType.Loading
};

type FetchResult<T> = SuccessfulFetch<T> | ErroredFetch | LoadingFetch

export const useFetch = <T>(url: string, ignoreCache: boolean = false) : FetchResult<T> => {
	const cache = useRef<{[key: string]: FetchResult<T>}>({});
	const [result, setResult] = useState<FetchResult<T>>({type: FetchResultType.Loading});
	const [isMounted, setIsMounted] = useState<boolean>(true);

	useEffect(() => {
		if (cache.current[url] && !ignoreCache) {
			const cached = cache.current[url];
			setResult(cached);
		}
		const doFetch = async () => {
			try {
				let response = await fetch(url);
				let data: T = await response.json();
				if (isMounted) {
					const success : SuccessfulFetch<T> = {type: FetchResultType.Success, result: data};
					cache.current[url] = success;
					setResult(success);
				}
			}
			catch (error) {
				if (error instanceof Error){
					const errored : ErroredFetch = {type: FetchResultType.Error, message: error.message}
					cache.current[url] = errored;
					setResult(errored);
				}
				throw error;
			}
		};

		doFetch();
		return () => setIsMounted(false);
	}, [url]);

	return result;
}