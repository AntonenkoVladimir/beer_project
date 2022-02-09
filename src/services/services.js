import axios from 'axios';

export const getBeer = async (page) => {
  let newBeer = [];
  await axios.get(`https://api.punkapi.com/v2/beers?page=${page}&per_page=28`).then(res => {
    if (res.status === 200) newBeer = res.data;
  })

  return newBeer;
}
