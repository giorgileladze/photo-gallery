import './style.css'

interface PropTypes {
    handleQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Search: React.FC<PropTypes> = ({handleQueryChange}) => {
  return (
    <div className='search'>
      <input onChange={(e) => handleQueryChange(e)} type='text' placeholder='Search' />
    </div>
  )
}

export default Search