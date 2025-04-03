import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary-500">404</h1>
        <h2 className="mt-2 text-3xl font-semibold text-neutral-800">Page Not Found</h2>
        <p className="mt-4 text-lg text-neutral-600 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. The page might have been moved, deleted, or never existed.
        </p>
        
        <div className="mt-10">
          <Link
            to="/"
            className="btn btn-primary inline-flex items-center"
          >
            <span className="material-icons mr-2">home</span>
            Return to Home
          </Link>
        </div>
        
        <div className="mt-8">
          <h3 className="text-lg font-medium text-neutral-800">Looking for something specific?</h3>
          <div className="mt-4 space-y-2">
            <Link to="/dashboard" className="block text-primary-600 hover:text-primary-500">
              Go to Dashboard
            </Link>
            <Link to="/resources" className="block text-primary-600 hover:text-primary-500">
              Browse Resources
            </Link>
            <Link to="/advocate-match" className="block text-primary-600 hover:text-primary-500">
              Find an Advocate
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <p className="text-neutral-500 text-sm">
          Need help? <a href="#" className="text-primary-600 hover:text-primary-500">Contact Support</a>
        </p>
      </div>
    </div>
  )
}

export default NotFoundPage
