import {useParams, useNavigate} from 'react-router-dom';
import {useEffect, useState, useMemo} from 'react';
import {getBeer} from '../../services/services';
import DetailsModal from '../Modals/DetailsModal';
import BarChart from '../BarChart/BarChart';
import './MainPage.scss';

const MainPage = () => {
  const sortValue = ['Without sort', 'ABV asc', 'ABV desc'];
  const navigate = useNavigate();
  const params = useParams();
  const [sortBy, setSortBy] = useState(params.sortBy);
  const [beerList, setBeerList] = useState([]);
  const [isDetails, setIsDetails] = useState(false);
  const [itemDetails, setItemDetails] = useState({});

  useEffect(async () => {
    const beer = await getBeer(params.page);
    setBeerList(beer);
  }, []);

  const pagination = async (dir) => {
    const page = Number(params.page);
    const newPage = dir === 'inc' ? page + 1 : page - 1;
    if (newPage !== 0) {
      if (dir === 'inc' && beerList.length < 28) {
      } else {
        const beer = await getBeer(newPage);
        navigate(`/main/${newPage}/${params.sortBy}`)
        setBeerList(beer);
      }
    }
  };

  const sortFunc = (beerList, sortBy) => {
    if (!beerList) return 0;
    if (sortBy === 'Without sort') {
      return beerList;
    } else {
      const newArr = beerList.map(i => (i));
      const sortedList = newArr.sort((a, b) => {
        if (a['abv'] > b['abv']) return 1;
        if (a['abv'] < b['abv']) return -1;
        return 0;
      })

      return sortBy === 'ABV asc' ? sortedList : sortedList.reverse()
    }
  };

  const sort = useMemo(() => sortFunc(beerList, sortBy), [beerList, sortBy]);

  const changeSort = (value) => {
    setSortBy((value));
    navigate(`/main/${params.page}/${value}`)
  };

  const details = (item) => {
    setItemDetails(item);
    setIsDetails(true);
  }

  return (
    <div className='main-page'>
      <BarChart beerList={beerList} details={details}/>
      <div className='main-page-container'>
        <select onChange={(e) => changeSort(e.target.value)} className='main-page-sort' value={params.sortBy}>
          {
            sortValue.map((item, index) => (<option key={`${item}-${index}`}>{item}</option>))
          }
        </select>
        <div className='main-table'>
          {
            sort.map((item) => (
              <div className='main-page-beer' key={`item-key:${item.id}`}>
                <p className='main-page-beer-abv'>{item.abv}</p>
                <div className='main-page-image-div' style={{backgroundImage: `url(${item.image_url})`}}
                     onClick={() => details(item)}/>
                <p>{item.name}</p>
                <p>{item.tagline}</p>
              </div>
            ))
          }
        </div>
        <div className='paggination-div'>
          <button onClick={() => pagination('desc')}>Previous</button>
          <button onClick={() => pagination('inc')}>Next</button>
        </div>
      </div>
      {isDetails && <DetailsModal item={itemDetails} setIsDetails={setIsDetails}/>}
    </div>
  );
}

export default MainPage;
