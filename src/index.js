import { useState, useCallback, useMemo } from "react";

const extractPage = (page, perPage, data) => {
	const from = page * perPage;
	const to = (page + 1) * perPage;

	return data.slice(from, to);
};

const usePagination = (data, perPage = 10) => {
	// TODO: don't store current page in state and instead take it as prop to come from route
	const [currentPage, setCurrentPage] = useState(0);

	const totalPages = Math.ceil(data.length / perPage);

	const firstPage = useCallback(() => {
		setCurrentPage(0);
	}, []);

	const lastPage = useCallback(() => {
		setCurrentPage(totalPages - 1);
	}, [totalPages]);

	const nextPage = useCallback(() => {
		setCurrentPage(p => p + 1);
	}, []);

	const previousPage = useCallback(() => {
		setCurrentPage(p => p - 1);
	}, []);

	const gotoPage = useCallback(v => {
		setCurrentPage(v);
	}, []);

	const paginated = useMemo(() => extractPage(currentPage, perPage, data), [
		currentPage,
		data,
		perPage
	]);

	return {
		firstPage,
		lastPage,
		nextPage,
		previousPage,
		gotoPage,
		totalPages,
		paginated,
		page: currentPage + 1,
		perPage
	};
};

export default usePagination;
