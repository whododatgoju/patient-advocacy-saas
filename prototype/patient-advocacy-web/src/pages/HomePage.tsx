import { Link } from 'react-router-dom'

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header/Navigation */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span className="text-primary-600 font-semibold text-xl">Patient Advocacy Platform</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="btn-text">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl font-bold mb-4 text-white">Empowering Patients Through Advocacy</h1>
              <p className="text-xl mb-8">
                Connect with advocates who can help navigate your healthcare journey, access resources, and make informed decisions.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/register" className="btn bg-white text-primary-600 hover:bg-neutral-100 focus:ring-white px-6 py-3">
                  Get Started
                </Link>
                <Link to="/about" className="btn bg-transparent border-2 border-white hover:bg-white/10 focus:ring-white px-6 py-3">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-lg shadow-xl p-6 text-neutral-700">
                <h3 className="text-xl font-semibold mb-4">Find Your Advocate Today</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">I am a</label>
                    <select className="input">
                      <option>Patient</option>
                      <option>Family member</option>
                      <option>Caregiver</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">I need help with</label>
                    <select className="input">
                      <option>Understanding my diagnosis</option>
                      <option>Insurance navigation</option>
                      <option>Finding specialists</option>
                      <option>Second opinions</option>
                      <option>Treatment options</option>
                    </select>
                  </div>
                  <button className="btn btn-primary w-full">Find Advocates</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">How We Help</h2>
            <p className="mt-4 text-lg text-neutral-600">Comprehensive support throughout your healthcare journey</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card">
              <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <span className="material-icons text-primary-600">people</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advocate Matching</h3>
              <p className="text-neutral-600">
                Connect with experienced advocates who understand your specific healthcare needs and challenges.
              </p>
            </div>
            
            <div className="card">
              <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <span className="material-icons text-primary-600">forum</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Communication</h3>
              <p className="text-neutral-600">
                Communicate safely with your care team through our encrypted messaging system designed for healthcare.
              </p>
            </div>
            
            <div className="card">
              <div className="rounded-full bg-primary-100 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <span className="material-icons text-primary-600">library_books</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Resource Library</h3>
              <p className="text-neutral-600">
                Access easy-to-understand materials about conditions, treatments, insurance, and patient rights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-800">Success Stories</h2>
            <p className="mt-4 text-lg text-neutral-600">Hear from patients who found their voice through advocacy</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-neutral-300 flex items-center justify-center mr-4">
                  <span className="text-neutral-600 font-medium">ML</span>
                </div>
                <div>
                  <h4 className="font-medium">Maria L.</h4>
                  <p className="text-sm text-neutral-500">Cancer Survivor</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "My advocate helped me understand complex treatment options and coordinated with multiple specialists. I felt empowered to make informed decisions about my care."
              </p>
            </div>
            
            <div className="card border border-neutral-200">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-neutral-300 flex items-center justify-center mr-4">
                  <span className="text-neutral-600 font-medium">JT</span>
                </div>
                <div>
                  <h4 className="font-medium">James T.</h4>
                  <p className="text-sm text-neutral-500">Chronic Condition Patient</p>
                </div>
              </div>
              <p className="text-neutral-600 italic">
                "Navigating insurance denials was overwhelming until I connected with an advocate who knew exactly how to appeal. They saved me thousands of dollars and helped me get the care I needed."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to take control of your healthcare journey?</h2>
          <p className="text-xl mb-8">Join thousands of patients who have found clarity, support, and better outcomes through patient advocacy.</p>
          <Link to="/register" className="btn bg-white text-primary-600 hover:bg-neutral-100 px-8 py-3 text-lg">
            Sign Up Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-800 text-neutral-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-semibold text-lg mb-4">Patient Advocacy Platform</h3>
              <p className="mb-4">Empowering patients through advocacy, education, and support.</p>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/about" className="hover:text-white">About Us</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white">How It Works</Link></li>
                <li><Link to="/advocates" className="hover:text-white">Our Advocates</Link></li>
                <li><Link to="/resources" className="hover:text-white">Resources</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">For Advocates</h4>
              <ul className="space-y-2">
                <li><Link to="/advocate-signup" className="hover:text-white">Join as Advocate</Link></li>
                <li><Link to="/advocate-resources" className="hover:text-white">Advocate Resources</Link></li>
                <li><Link to="/training" className="hover:text-white">Training Programs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-4">Contact</h4>
              <ul className="space-y-2">
                <li><a href="mailto:support@patientadvocacy.org" className="hover:text-white">support@patientadvocacy.org</a></li>
                <li><a href="tel:+18005551234" className="hover:text-white">(800) 555-1234</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
            <p>© 2025 Patient Advocacy Platform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
