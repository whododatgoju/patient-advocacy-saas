import { useSelector } from 'react-redux'
import { RootState } from '../store.ts'

const DashboardPage = () => {
  const { userRole } = useSelector((state: RootState) => state.auth)
  const { profile } = useSelector((state: RootState) => state.user)

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-neutral-800">Dashboard</h1>
        <p className="text-neutral-600">Welcome to your Patient Advocacy Platform dashboard</p>
      </div>

      {/* Dashboard Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions Card */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="space-y-2">
            {userRole === 'patient' && (
              <>
                <button className="btn btn-primary w-full justify-between">
                  <span>Find an Advocate</span>
                  <span className="material-icons">arrow_forward</span>
                </button>
                <button className="btn btn-secondary w-full justify-between">
                  <span>Upload Medical Records</span>
                  <span className="material-icons">arrow_forward</span>
                </button>
              </>
            )}
            
            {userRole === 'advocate' && (
              <>
                <button className="btn btn-primary w-full justify-between">
                  <span>View Pending Requests</span>
                  <span className="material-icons">arrow_forward</span>
                </button>
                <button className="btn btn-secondary w-full justify-between">
                  <span>Update Availability</span>
                  <span className="material-icons">arrow_forward</span>
                </button>
              </>
            )}
            
            {userRole === 'provider' && (
              <>
                <button className="btn btn-primary w-full justify-between">
                  <span>Refer a Patient</span>
                  <span className="material-icons">arrow_forward</span>
                </button>
                <button className="btn btn-secondary w-full justify-between">
                  <span>View Patient Records</span>
                  <span className="material-icons">arrow_forward</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Upcoming Activities */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Upcoming Activities</h2>
          {userRole === 'patient' && (
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-primary-100 p-2 mr-3">
                  <span className="material-icons text-primary-600 text-sm">event</span>
                </div>
                <div>
                  <p className="font-medium">Consultation with Dr. Smith</p>
                  <p className="text-sm text-neutral-500">April 10, 2025 at 10:00 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-success-100 p-2 mr-3">
                  <span className="material-icons text-success-600 text-sm">videocam</span>
                </div>
                <div>
                  <p className="font-medium">Video call with Advocate</p>
                  <p className="text-sm text-neutral-500">April 15, 2025 at 2:00 PM</p>
                </div>
              </div>
            </div>
          )}
          
          {userRole === 'advocate' && (
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-primary-100 p-2 mr-3">
                  <span className="material-icons text-primary-600 text-sm">people</span>
                </div>
                <div>
                  <p className="font-medium">New Patient Onboarding</p>
                  <p className="text-sm text-neutral-500">April 8, 2025 at 11:00 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-success-100 p-2 mr-3">
                  <span className="material-icons text-success-600 text-sm">videocam</span>
                </div>
                <div>
                  <p className="font-medium">Case Review Meeting</p>
                  <p className="text-sm text-neutral-500">April 12, 2025 at 3:00 PM</p>
                </div>
              </div>
            </div>
          )}
          
          {userRole === 'provider' && (
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="rounded-full bg-primary-100 p-2 mr-3">
                  <span className="material-icons text-primary-600 text-sm">people</span>
                </div>
                <div>
                  <p className="font-medium">Care Team Conference</p>
                  <p className="text-sm text-neutral-500">April 9, 2025 at 9:00 AM</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="rounded-full bg-success-100 p-2 mr-3">
                  <span className="material-icons text-success-600 text-sm">videocam</span>
                </div>
                <div>
                  <p className="font-medium">Patient Follow-up Calls</p>
                  <p className="text-sm text-neutral-500">April 11, 2025 at 1:00 PM</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats/Notifications Card */}
        <div className="card">
          <h2 className="text-lg font-semibold mb-4">Recent Notifications</h2>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="rounded-full bg-info-100 p-2 mr-3">
                <span className="material-icons text-info-600 text-sm">notification_important</span>
              </div>
              <div>
                <p className="font-medium">New message received</p>
                <p className="text-sm text-neutral-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-warning-100 p-2 mr-3">
                <span className="material-icons text-warning-600 text-sm">event_available</span>
              </div>
              <div>
                <p className="font-medium">Appointment confirmed</p>
                <p className="text-sm text-neutral-500">Yesterday</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="rounded-full bg-success-100 p-2 mr-3">
                <span className="material-icons text-success-600 text-sm">check_circle</span>
              </div>
              <div>
                <p className="font-medium">Document review completed</p>
                <p className="text-sm text-neutral-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Content */}
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {/* Resources Section */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recommended Resources</h2>
            <button className="btn-text">View All</button>
          </div>
          <div className="space-y-3">
            <div className="border rounded-md p-3 hover:bg-neutral-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-medium">Understanding Your Insurance Benefits</p>
                <span className="material-icons text-neutral-400">description</span>
              </div>
              <p className="text-sm text-neutral-500">Learn how to maximize your coverage</p>
            </div>
            <div className="border rounded-md p-3 hover:bg-neutral-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-medium">Patient Rights Guide</p>
                <span className="material-icons text-neutral-400">description</span>
              </div>
              <p className="text-sm text-neutral-500">What every patient should know</p>
            </div>
            <div className="border rounded-md p-3 hover:bg-neutral-50 cursor-pointer">
              <div className="flex justify-between items-center">
                <p className="font-medium">Medication Management Tips</p>
                <span className="material-icons text-neutral-400">description</span>
              </div>
              <p className="text-sm text-neutral-500">Strategies for staying on track</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <button className="btn-text">View All</button>
          </div>
          <div className="border-b pb-3">
            <p className="font-medium">Profile updated</p>
            <p className="text-sm text-neutral-500">You updated your contact information</p>
            <p className="text-xs text-neutral-400 mt-1">Today, 10:23 AM</p>
          </div>
          <div className="border-b py-3">
            <p className="font-medium">Document shared</p>
            <p className="text-sm text-neutral-500">Lab results shared with Dr. Johnson</p>
            <p className="text-xs text-neutral-400 mt-1">Yesterday, 3:45 PM</p>
          </div>
          <div className="pt-3">
            <p className="font-medium">Message sent</p>
            <p className="text-sm text-neutral-500">Question about medication side effects</p>
            <p className="text-xs text-neutral-400 mt-1">April 1, 2025, 9:12 AM</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
