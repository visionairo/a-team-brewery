import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ISearchBreweryData } from "../lib/search/types";
import styles from "../styles/Home.module.css";
import { IApiSearchResponseData } from "./api/search";

export interface IResults {
  searchResults: ISearchBreweryData[];
}

export const getServerSideProps: GetServerSideProps<IResults> = async () => {
  let searchResults: IApiSearchResponseData = [];
  const response = await fetch(`http://localhost:3000/api/search`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });
  searchResults = await response.json();
  return {
    props: {
      searchResults,
    },
  };
};

const Home: NextPage<IResults> = ({ searchResults, ...props }) => {
  const hasResults = searchResults.length > 0;
  const [sResult, setSearchResult] =
    useState<ISearchBreweryData[]>(searchResults);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    let response: Response;
    async function fetchData(searchTerm: string) {
      if (searchTerm !== "") {
        response = await fetch(
          `http://localhost:3000/api/search/${searchTerm}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        );
      } else {
        response = await fetch(`http://localhost:3000/api/search`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
      }
      searchResults = await response.json();
      setSearchResult(searchResults);
    }
    fetchData(searchTerm);
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Helloooooo test test</h1>
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <fieldset>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700"
              >
                Search
              </label>
              <div className="flex justify-between items-center">
                <input
                  id="search"
                  name="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="submit"
                  className="inline-flex items-center rounded border border-transparent bg-indigo-600 px-2.5 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Search
                </button>
              </div>
            </fieldset>
          </form>
          <section className="pt-4">
            {hasResults ? (
              <div>
                {sResult.map((result, idx) => {
                  return <div key={idx}>{JSON.stringify(result)}</div>;
                })}
              </div>
            ) : (
              <p>No results found.</p>
            )}
          </section>
        </>
      </main>
    </div>
  );
};

export default Home;
