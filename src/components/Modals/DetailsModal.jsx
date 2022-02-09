import './DetailsModal.scss';

const DetailsModal = ({item, setIsDetails}) => {
  return (
    <div className="DetailsModal" onClick={() => setIsDetails(false)}>
      <p className='details-modal-close' onClick={() => setIsDetails(false)}>Close</p>
      <div className='details-modal-main' onClick={(e) => e.stopPropagation()}>
        <div className='details-modal-main-left'>
          <p>Name: {item.name}</p>
          <p>Tagline: {item.tagline}</p>
          <p>ABV: {item.abv}</p>
          <p>Description: {item.description}</p>
          <p>Date first brewed: {item.first_brewed}</p>
          <p>Brewer’s tips: {item.brewers_tips}</p>
        </div>
        <div className='details-modal-main-right'>
          <img src={item.image_url} />
        </div>
      </div>
    </div>
  );
}

export default DetailsModal;
