import { User, Settings, FileText, Bell } from 'lucide-react';
import MainContainer from '@/app/components/Settings/MainContainer';

export default async function ProfilePage() {
  return (
    <>
      <MainContainer>
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">
                  Total Projects
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">12</p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 text-sm font-medium">
                    ↑ 7%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">
                  Contributions
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">158</p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 text-sm font-medium">
                    ↑ 12%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="text-gray-500 text-sm font-medium">
                  Activity Score
                </h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">92%</p>
                <div className="flex items-center mt-4">
                  <span className="text-green-500 text-sm font-medium">
                    ↑ 3%
                  </span>
                  <span className="text-gray-400 text-sm ml-2">
                    vs last month
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center p-4 border rounded-lg"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <FileText className="text-blue-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-gray-800">
                        Updated Project Documentation
                      </h3>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </>
  );
}
