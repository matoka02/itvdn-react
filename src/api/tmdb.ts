// export async function getNowPlaying() {
//   const options = {
//     method: 'GET',
//     headers: {
//       accept: 'application/json',
//       Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOGI0Y2E4YWUzMTczOGFlOTBjM2NiNThlNGIwMzE5MCIsInN1YiI6IjY0Yjg1MmNlMTY4NWRhMDBmZWFlNDVkOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.aL7uKxWINxkcFGar0aAzi35hyBsKWv979sqfSff6no4'
//     }
//   };

//   const response = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1', options);
//   const json = response.json();

//   return json;
// }
import configuration from '../configuration';

async function get<TBody>(relativeUrl: string): Promise<TBody> {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      // Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
      Authorization: `Bearer ${configuration.apiToken}`
    }
  };

  // const response = await fetch(`${process.env.REACT_APP_API_URL}/3${relativeUrl}`, options);
  const response = await fetch(`${configuration.apiUrl}/3${relativeUrl}`, options);
  const json: TBody = await response.json();

  return json;
}

interface PageResponse<TResult> {
  page: number;
  results: TResult[],
  // total_pages: number;
  // total_results: number;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  backdrop_path?: string;
}

interface Configuration {
  images: {
    base_url: string;
  }
}

export const client = {
  async getConfiguration(){
    return get<Configuration>(`/configuration`);
  },
  async getNowPlaying(): Promise<MovieDetails[]> {
    // return await get(`/movie/now_playing?page=1`);
    const response = await get<PageResponse<MovieDetails>>(`/movie/now_playing?page=1`);
    return response.results;
  }
}