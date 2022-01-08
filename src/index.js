import { request, gql } from 'graphql-request';
const dataFetchIntervalInMs = 1 * 2 * 1000;;
const auctionNumberPerCall = 2;

setInterval(() => {
    const now = new Date();
    console.log(now.toLocaleString())
    callToSorareApi(auctionNumberPerCall).catch((error) => console.error(error))
}, dataFetchIntervalInMs)

async function callToSorareApi(num) {
    const endpoint = 'https://api.sorare.com/graphql'
    const query = gql`
  query ListSoonEndingEnglishAuctions {
    transferMarket {
      englishAuctions(first: ${num.toString()}) {
        nodes {
          slug
          currentPrice
          startDate
          endDate
          cards {
            slug
            player{
              age
            }
            name
            rarity
            priceRange{
              min
              max
            }
          }
        }
      }
    }
  }
  `
    const data = await request(endpoint, query)
    console.log(JSON.stringify(data, undefined, 2))
}


const helloWorld = () => console.log('Hello World!');

helloWorld();

