import Head from "next/head"
import { useRouter } from "next/router";
import Header from "../components/Header"
import SearchResults from "../components/SearchResults";
const API_KEY = process.env.API_KEY
const CONTEXT_KEY = process.env.API_KEY
function Search({ results }) {
    const router = useRouter();
    return (
        <div>
            <Head>
                <title>{router.query.term} - Google Search</title>
            </Head>
            {/* Header */}
            <Header></Header>
            {/* Search Results */}
            <SearchResults results={results}></SearchResults>
        </div>

    )
}

export default Search

export async function getServerSideProps(context) {
    const useDummyData = false;
    const startIndex = context.query.start || "0";
    const data = useDummyData ? null : await fetch(`https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${CONTEXT_KEY}&q=${context.query.term}&start=${startIndex}`)
        .then(response => response.json());

    //pass results to the client
    return {
        props: {
            results: data
        }
    }
}