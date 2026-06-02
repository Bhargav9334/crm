const ClientCardsSkeleton = ({ count = 6 }) => {
  return (
    <section className="mb-7 px-4 sm:px-6 py-8 min-h-[40vh]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-2xl p-6 shadow-lg animate-pulse"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="space-y-2 w-full">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>

              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-200 flex justify-between items-center">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded-full w-16"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
 const EmployeeCardsSkeleton = ({ count = 6 }) => {
  return (
    <section className="px-4 sm:px-6 mb-7 py-8 min-h-[40vh]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="bg-white/70 border border-white/40 rounded-2xl p-6 shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-3 w-full">
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>

              <div className="flex gap-2">
                <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
                <div className="h-8 w-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Employee Details */}
            <div className="mt-5 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
const ManagerTable = () => {
  return (
    <div className="w-full border bg-white animate-pulse">
      <table className="w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Role</th>
            <th className="p-3 border">Created</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>

        <tbody>
          {[...Array(5)].map((_, i) => (
            <tr key={i}>
              <td className="p-3 border">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </td>
              <td className="p-3 border">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </td>
              <td className="p-3 border">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </td>
              <td className="p-3 border">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </td>
              <td className="p-3 border flex justify-center">
                <div className="h-8 w-16 bg-gray-200 rounded"></div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const InvoiceListSkeleton = ({ count = 5 }) => {
  return (
    <section className="px-4 sm:px-6 mb-7 py-8 min-h-[40vh]">
      <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg space-y-6 animate-pulse">

        {/* Title */}
        <div className="h-6 w-40 bg-gray-200 rounded"></div>

        {[...Array(count)].map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-5 border border-gray-200 rounded-xl bg-white/60"
          >
            {/* Left Side */}
            <div className="flex items-start gap-4 w-full">
              <div className="w-12 h-12 rounded-xl bg-gray-200"></div>

              <div className="space-y-3 w-full">
                <div className="h-4 bg-gray-200 rounded w-40"></div>
                <div className="h-3 bg-gray-200 rounded w-56"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>

            {/* Right Side */}
            <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto">
              <div className="space-y-3">
                <div className="h-5 bg-gray-200 rounded w-24"></div>
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
              </div>

              <div className="flex gap-2">
                <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
                <div className="h-9 w-9 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProjectCardsSkeleton = ({ count = 6 }) => {
  return (
    <section className="px-6 py-8 min-h-screen">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="bg-white/70 backdrop-blur-lg border border-white/40 rounded-2xl p-6 shadow-lg"
          >
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="space-y-3 w-full">
                <div className="h-5 bg-gray-200 rounded w-2/3"></div>
                <div className="h-5 bg-gray-200 rounded-full w-20"></div>
              </div>

              <div className="flex gap-2">
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            {/* Client */}
            <div className="flex items-center gap-2 mt-4">
              <div className="h-4 w-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>

            {/* Description */}
            <div className="mt-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-full"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>
            </div>

            {/* Progress Section */}
            <div className="mt-5 space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-5 bg-gray-200 rounded w-10"></div>
              </div>

              <div className="w-full h-3 bg-gray-200 rounded-full"></div>
            </div>

            {/* Notes */}
            <div className="mt-5 bg-gray-100 border border-gray-200 rounded-lg px-3 py-3 space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
              <div className="h-3 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
const ProposalListSkeleton = ({ count = 5 }) => {
  return (
    <section className="bg-gray-50 px-4 sm:px-6 mb-7">
      <div className="max-w-7xl mx-auto bg-white border rounded-xl p-6 space-y-4 animate-pulse">

        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-48"></div>

        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-4 p-4 border rounded-lg"
          >
            {/* Left Side */}
            <div className="space-y-3 w-full">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4"></div>

              <div className="flex gap-2 mt-2">
                <div className="h-8 w-10 bg-gray-200 rounded-md"></div>
                <div className="h-8 w-10 bg-gray-200 rounded-md"></div>
              </div>
            </div>

            {/* Right Side */}
            <div className="text-right space-y-3">
              <div className="h-5 bg-gray-200 rounded w-24"></div>
              <div className="h-4 bg-gray-200 rounded-full w-16"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};


export {
  EmployeeCardsSkeleton,
  ClientCardsSkeleton,
  ManagerTable,
  InvoiceListSkeleton,
  ProjectCardsSkeleton,
  ProposalListSkeleton,
  EmployeeDashboardSkeleton,
  EmployeeProfileSkeleton,
  ClientDashboardSkeleton,
  ClientProfileSkeleton,
};
  const EmployeeDashboardSkeleton = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen animate-pulse">

      {/* Header */}
      <div className="bg-white rounded-3xl p-8 mb-8 shadow-sm">
        <div className="h-10 w-72 bg-gray-200 rounded mb-4"></div>

        <div className="h-5 w-40 bg-gray-200 rounded mb-5"></div>

        <div className="flex gap-6">
          <div className="h-4 w-48 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="flex justify-between items-start">

              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>

                <div className="h-10 w-32 bg-gray-200 rounded"></div>
              </div>

              <div className="h-8 w-8 bg-gray-200 rounded-full"></div>

            </div>
          </div>
        ))}

      </div>

      {/* Projects Section */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">

        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-52 bg-gray-200 rounded"></div>

          <div className="h-6 w-20 bg-gray-200 rounded"></div>
        </div>

        {/* 2x2 Grid Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="border rounded-2xl p-6"
            >

              {/* Project Header */}
              <div className="flex justify-between items-center mb-5">

                <div className="h-7 w-40 bg-gray-200 rounded"></div>

                <div className="h-10 w-36 bg-gray-200 rounded-full"></div>

              </div>

              {/* Description */}
              <div className="h-4 w-full bg-gray-200 rounded mb-3"></div>
              <div className="h-4 w-3/4 bg-gray-200 rounded mb-5"></div>

              {/* Progress Bar */}
              <div className="h-3 w-full bg-gray-200 rounded mb-6"></div>

              {/* Dates */}
              <div className="grid grid-cols-2 gap-4 mb-5">

                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>

                  <div className="h-5 w-32 bg-gray-200 rounded"></div>
                </div>

                <div>
                  <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>

                  <div className="h-5 w-32 bg-gray-200 rounded"></div>
                </div>

              </div>

              {/* Progress Notes */}
              <div>
                <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>

                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>

                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
};
const EmployeeProfileSkeleton = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen animate-pulse">

      {/* Header */}
      <div className="h-52 rounded-3xl bg-gray-200 mb-8"></div>

      {/* Personal Details */}
      <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
        <div className="h-8 w-56 bg-gray-200 rounded mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1,2,3,4,5,6].map((item) => (
            <div key={item}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Career Details */}
      <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
        <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1,2,3,4].map((item) => (
            <div key={item}>
              <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-52 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Banking Details */}
      <div className="bg-white rounded-3xl p-8 shadow-sm mb-8">
        <div className="h-8 w-52 bg-gray-200 rounded mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1,2,3,4].map((item) => (
            <div key={item}>
              <div className="h-4 w-28 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-48 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Documents */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">
        <div className="h-8 w-40 bg-gray-200 rounded mb-8"></div>

        <div className="grid md:grid-cols-2 gap-8">
          {[1,2,3].map((item) => (
            <div key={item}>
              <div className="h-4 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-6 w-40 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
const ClientDashboardSkeleton = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen animate-pulse">

      {/* Header */}
      <div className="h-52 rounded-3xl bg-gray-200 mb-8"></div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-5 mb-8">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-2xl p-6 shadow-sm"
          >
            <div className="h-4 w-20 bg-gray-200 rounded mb-4"></div>

            <div className="h-10 w-24 bg-gray-200 rounded"></div>
          </div>
        ))}

      </div>

      {/* My Projects Section */}

      <div className="bg-white rounded-3xl p-8 shadow-sm">

        <div className="h-8 w-48 bg-gray-200 rounded mb-8"></div>

        {[1, 2].map((item) => (
          <div
            key={item}
            className="border rounded-2xl p-6 mb-5"
          >
            <div className="flex justify-between mb-4">

              <div className="h-6 w-52 bg-gray-200 rounded"></div>

              <div className="h-8 w-24 bg-gray-200 rounded-full"></div>

            </div>

            <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>

            <div className="h-4 w-3/4 bg-gray-200 rounded mb-4"></div>

            <div className="h-3 w-full bg-gray-200 rounded mb-5"></div>

            <div className="grid md:grid-cols-2 gap-4">

              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>

              <div>
                <div className="h-4 w-20 bg-gray-200 rounded mb-2"></div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
const ClientProfileSkeleton = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen animate-pulse">

      {/* Header */}
      <div className="h-40 rounded-3xl bg-gray-200 mb-8"></div>

      {/* Client Information Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm">

        <div className="h-10 w-64 bg-gray-200 rounded mb-10"></div>

        <div className="grid md:grid-cols-2 gap-10">

          <div>
            <div className="h-5 w-28 bg-gray-200 rounded mb-3"></div>
            <div className="h-7 w-48 bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-5 w-24 bg-gray-200 rounded mb-3"></div>
            <div className="h-7 w-52 bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-5 w-20 bg-gray-200 rounded mb-3"></div>
            <div className="h-7 w-64 bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-5 w-20 bg-gray-200 rounded mb-3"></div>
            <div className="h-7 w-40 bg-gray-200 rounded"></div>
          </div>

        </div>

      </div>

    </div>
  );
};
export const EmployeeProjectsSkeleton = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-screen animate-pulse">

      {/* Header */}
      <div className="mb-8">
        <div className="h-10 w-64 bg-gray-200 rounded-xl mb-4"></div>
        <div className="h-5 w-80 bg-gray-200 rounded"></div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="bg-white rounded-3xl p-7 shadow-sm"
          >
            {/* Top */}
            <div className="flex justify-between items-start">

              <div className="flex-1">
                <div className="h-8 w-52 bg-gray-200 rounded-lg mb-4"></div>

                <div className="h-4 bg-gray-200 rounded w-full mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>

              <div className="h-12 w-28 bg-gray-200 rounded-full ml-4"></div>

            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="h-4 bg-gray-200 rounded-full"></div>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-6 mt-8">

              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>

              <div>
                <div className="h-4 w-24 bg-gray-200 rounded mb-3"></div>
                <div className="h-5 w-32 bg-gray-200 rounded"></div>
              </div>

            </div>

            {/* Progress Notes */}
            <div className="mt-6 border-t pt-5">

              <div className="h-4 w-32 bg-gray-200 rounded mb-3"></div>

              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>

              <div className="h-4 bg-gray-200 rounded w-2/3"></div>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
};
// export default ClientCardsSkeleton