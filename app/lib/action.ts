'use server'

export const FetchData = async (latitude: number, longitude: number) => {
    const apiKey: string = process.env.API_KEY || ""

    // api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid={API key} forcast link
 
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`, { cache: 'no-store' })

    if (!res.ok) {
        throw new Error('Failed to fetch')
    }
    const data = await res.json()
    console.log(data)
    return data
}


