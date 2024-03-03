import './style.css'

const PageNotFound: React.FC = () => {
  return (
    <div className="not-found-container">
      <div>
        <h1 className="not-found-title">404 - Not Found</h1>
        <p className="not-found-text">The page you are looking for does not exist.</p>
      </div>
    </div>
  )
}

export default PageNotFound;