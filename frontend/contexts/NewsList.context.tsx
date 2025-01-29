'use client';
/* * */

import { NewsData } from '@/types/news.types';
import { createContext, useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
/* * */

interface NewsListContextState {
	actions: {
		updateFilterByDate: (value: Date) => void
		updateFilterByTitle: (value: string) => void
	}
	data: {
		filtered: NewsData[]
		raw: NewsData[]
	}
	filters: {
		by_date: null | string
		by_title: null | string
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const NewsListContext = createContext<NewsListContextState | undefined>(undefined);

export function useNewsListContext() {
	const context = useContext(NewsListContext);
	if (!context) {
		throw new Error('useNewsListContext must be used within a NewsListContextProvider');
	}
	return context;
}

/* * */

export const NewsListContextProvider = ({ children }) => {
	//

	//
	// A. Setup variables

	const [dataFilteredState, setDataFilteredState] = useState<NewsData[]>([]);
	const [filterByTitle, setFilterByTitle] = useState<NewsListContextState['filters']['by_title']>(null);
	const [filterByDate, setFilterByDate] = useState<NewsListContextState['filters']['by_date']>(null);
	//
	// B. Fetch data

	const { data: allNewsData, isLoading: allNewsLoading } = useSWR<NewsData[], Error>(`api/news`, { refreshInterval: 30000 });
	//
	// C. Transform data

	const applyFiltersToData = () => {
		//

		let filterResult: NewsData[] = allNewsData || [];

		//
		// Filter by news date
		if (filterByTitle) {
			filterResult = filterResult.filter((newsItem) => {
				const titleLowerCase = newsItem.title.toLowerCase();
				return titleLowerCase.includes(filterByTitle.toLowerCase());
			});
		}

		//
		// Filter by news title
		if (filterByDate) {
			const date = filterByDate.split('T')[0];
			filterResult = filterResult.filter((newsItem) => {
				return newsItem.publish_date.includes(date);
			});
		}

		if (filterByDate && filterByTitle) {
			const date = filterByDate.split('T')[0];
			const newsByDate = filterResult.filter(newsItem => newsItem.publish_date.includes(date));
			filterResult = newsByDate.filter((newsItem) => {
				const titleLowerCase = newsItem.title.toLowerCase();
				return titleLowerCase.includes(filterByTitle.toLowerCase());
			});
		}

		// Save filter result to state
		return filterResult;

		//
	};

	useEffect(() => {
		const filteredNews = applyFiltersToData();
		setDataFilteredState(filteredNews);
		console.log(filteredNews);
	}, [allNewsData, filterByTitle, filterByDate]);

	//
	// D. Handle actions

	const updateFilterByTitle = (value: NewsListContextState['filters']['by_title']) => {
		setFilterByTitle(value || null);
	};

	const updateFilterByDate = (value: Date) => {
		setFilterByDate(value.toISOString());
	};

	//
	// E. Define context value

	const contextValue: NewsListContextState = {
		actions: {
			updateFilterByDate,
			updateFilterByTitle,
		},
		// counters: {
		//     by_search: {
		//         open: f?.filter(item => item.realtime?.current_status === 'open').length || 0,
		//     },
		// },
		data: {
			filtered: dataFilteredState,
			raw: allNewsData || [],
		},
		filters: {
			by_date: filterByDate,
			by_title: filterByTitle,
		},
		flags: {
			is_loading: allNewsLoading,
		},
	};

	//
	// F. Render components

	return (
		<NewsListContext.Provider value={contextValue}>
			{children}
		</NewsListContext.Provider>
	);

	//
};
