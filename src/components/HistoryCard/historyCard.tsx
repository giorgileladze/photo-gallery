import './style.css'

interface PorpTypes {
    keys: string[]
    active: string
    onClick: (key: string) => void
}

const HistoryCard: React.FC<PorpTypes> = ({keys, active, onClick}) => {
    const handleClick = (key: string) => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        onClick(key)
    }

  return (
    <div className='history-card'>
        {keys.map(el => {
            return (
                <span key={el} className={`${active === el ? 'active' : ''}`} onClick={() => handleClick(el)}>
                    {el}
                </span>
            )
        })
        }
    </div>
  )
}

export default HistoryCard