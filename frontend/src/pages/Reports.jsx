import React from 'react'
import { Calendar, ArrowUpAZ, Download, TrendingUp } from 'lucide-react'
import { FiBarChart, FiPieChart } from 'react-icons/fi'

const Reports = () => {
  return (
    <>
      <div className='w-full min-h-screen bg-gray-50'>

        <section className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">


            <div>
              <h2 className="text-2xl md:text-3xl font-bold">
                Advanced Reports
              </h2>
              <p className="text-sm md:text-base text-gray-600">
                Analyze your business performance with detailed insights
              </p>
            </div>


            <div className="flex flex-wrap items-center gap-3">


              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-gray-600" />
                <select
                  className="text-sm font-medium text-gray-700
            bg-white border border-gray-300 rounded-md px-3 py-2
            focus:outline-none"
                  defaultValue="thirtyD"
                >
                  <option value="sevenD">Last 7 days</option>
                  <option value="thirtyD">Last 30 days</option>
                  <option value="threeM">Last 3 months</option>
                  <option value="year">Last year</option>
                </select>
              </div>


              <div className="flex items-center gap-2">
                <ArrowUpAZ size={18} className="text-gray-600" />
                <select
                  className="text-sm font-medium text-gray-700
            bg-white border border-gray-300 rounded-md px-3 py-2
            focus:outline-none"
                  defaultValue="All"
                >
                  <option value="All">All Clients</option>
                </select>
              </div>


              <a
                href="/files/report.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-2
          bg-white border border-gray-300 rounded-md
          text-sm font-medium text-gray-800
          hover:bg-gray-50 transition"
              >
                <Download size={18} />
                Download
              </a>
            </div>

          </div>
        </section>

        <section className='max-w-7xl mx-auto px-4  '>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-4 gap-4">

            <StatsCard title="Total Revenue"
              value={"CHF 0"}
              details={"+12.5%"}
              icon={FiBarChart}
              iconColor="text-green-600"
              iconBgColor='bg-green-100'
              textColor='text-green-600'
            />
            <StatsCard title="Active Clients"
              value={0}
              details={'0 new this month'}
              icon={FiPieChart}
              iconColor="text-blue-600"
              iconBgColor='bg-blue-100'
            />
            <StatsCard title="Completed Projects"
              value={0}
              details={'0 active'}
              icon={FiBarChart}
              iconColor="text-purple-600"
              iconBgColor='bg-purple-100'
            />
            <StatsCard title="Hours Tracked"
              value={0}
              details={'7.1h/day avg'}
              icon={TrendingUp}
              iconColor="text-orange-600"
              iconBgColor='bg-orange-100'
            />

          </div>
        </section>
        <section className="h-full flex items-center justify-center bg-gray-50 mb-7">
          <div className="w-full max-w-7xl p-7 flex flex-col items-start gap-5 border-2 bg-white rounded-lg">
            <h1 className='text-2xl font-bold inline-flex gap-2 '>Revenue Trend</h1>
            <div className="w-full max-w-7xl h-64 px-4 sm:px-10 flex items-center justify-center">
              <h2
                className="
      text-xs
      sm:text-sm
      md:text-base
      lg:text-lg
      font-bold
      text-[#4B5563]
      font-sans
      whitespace-nowrap
      overflow-hidden
      text-ellipsis
      text-center
    "
              >
                No revenue data available for the selected period
              </h2>
            </div>



          </div>
        </section>
        <section className="w-full bg-gray-50 mb-7 px-1">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">


            <div className="
  w-full
  min-h-[150px]
  sm:min-h-[200px]
  lg:min-h-[250px]
  p-5
  flex
  flex-col
  items-start
  border
  bg-white
  rounded-lg
  shadow-sm
">
              <h1 className="text-2xl font-bold">Top Clients by Revenue</h1>
            </div>



            <div className="w-full p-7 flex flex-col gap-5 border bg-white rounded-lg shadow-sm">
              <h1 className="text-2xl font-bold">Project Status Overview</h1>


              <div className="flex justify-between w-full p-2">

                <div className="flex flex-col gap-6 text-gray-700 font-medium">
                  <span>Completed Projects</span>
                  <span>Active Projects</span>
                </div>

                <div className="flex flex-col gap-6 items-end">
                  <div className="flex items-center gap-3">
                    <div className="w-36 h-2 bg-green-600 rounded-full">
                      <div className="w-0 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold">0</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-36 h-2 bg-blue-600 rounded-full">
                      <div className="w-0 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <span className="text-sm font-semibold">0</span>
                  </div>
                </div>
              </div>


              <div className="flex justify-between w-full p-1 border-t">

                <div className="flex flex-col gap-6 font-medium text-gray-700">
                  <span>On Track</span>
                  <span>Delayed</span>
                </div>

                <div className="flex flex-col gap-6 items-end">
                  <span className="bg-green-100 px-3 py-1 rounded-full text-sm font-semibold text-green-600">
                    0
                  </span>
                  <span className="bg-blue-100 px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                    0
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

      </div>
    </>
  )
}
const StatsCard = ({
  title,
  value,
  description,
  icon: Icon,
  onClick,
  details,
  textColor = 'text-gray-500',
  iconColor = "text-blue-600",
  iconBgColor = "bg-blue-600",
  className = "",
}) => {
  return (
    <div onClick={onClick}
      role="button"
      tabIndex={0}

      className={`w-full border border-gray-200 rounded-lg p-6
                  flex items-center justify-between bg-white gap-1 pl-6${className}`}
    >
      <div className="flex flex-col ">
        <span className="text-sm font-medium text-gray-500">
          {title}
        </span>

        <span className={`text-3xl font-bold `}>
          {value}
        </span>
        <span className={`text-sm font-medium ${textColor}`}>
          {details}
        </span>


      </div>

      {Icon && (
        <div className={`p-3  rounded-lg ${iconColor} ${iconBgColor}`}>
          <Icon size={28} />
        </div>
      )}
    </div>
  );
};
export default Reports
