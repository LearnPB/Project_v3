export async function fetchData(countryCode: string) {
	return await fetch(
		`https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.PCAP.CD?format=json&per_page=100`
	)
		.then((resp) => resp.json())
		.then((json) => json[1])
		.then((data) =>
			data
				.map((d: any) => ({
					...d,
					date: Number(d.date),

					country: d.country.value
				}))
				.slice()
				.sort((a, b) => a.date - b.date)
		)
		.catch((e) => {
			throw new Error(e)
		})
}
