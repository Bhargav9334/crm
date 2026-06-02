import { Home, ChevronRight, Upload, File } from 'lucide-react'
import { NavLink } from 'react-router-dom'
const navItems = [
    // { label: 'Dashboard', path: '/'},
    { label: 'Clients', path: '/clients' },
    { label: 'Projects', path: '/project' },
    { label: 'Messages', path: '/' }
    // { label: 'More', path : '/more', icon: MoreHorizontal }
]
const Files = () => {
    return (
        <>
            <div className='w-full min-h-screen bg-gray-50 py-10'>
                <div className="mx-auto max-w-7xl flex items-center border-b md:px-10 lg:px-11 pb-2 gap-4">

                    <div className="flex items-center gap-2">
                        <NavLink
                            to="/"
                            className="inline-flex items-center text-gray-700 hover:text-blue-600"
                            aria-label="Go to Dashboard"
                        >
                            <Home size={16} />
                        </NavLink>

                        <ChevronRight size={16} className="text-gray-400" />

                        <span className="text-sm font-medium text-gray-700">
                            Files
                        </span>
                    </div>

                    <div className="flex items-center gap-1 ml-auto">
                        <span className="text-gray-500 text-sm whitespace-nowrap">
                            Quick access:
                        </span>

                        <nav className="flex gap-1">
                            {navItems.map(({ label, path }) => (
                                <NavLink
                                    key={label}
                                    to={path}
                                    className={({ isActive }) =>
                                        `px-3 py-1.5 text-sm rounded-md transition-colors
             ${isActive
                                            ? "bg-[#667CFA] text-white"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }`
                                    }
                                >
                                    {label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                </div>

                <section className="max-w-7xl mx-auto p-6">
                    <div className="mx-auto max-w-7xl px-1 py-1">
                        <div className="flex flex-row items-center justify-between gap-6">

                            <div>
                                <h2 className="text-3xl font-bold">Files</h2>
                                <p className="text-gray-600 whitespace-nowrap">
                                    Manage your project portfolio
                                </p>
                            </div>

                            <div className="inline-flex items-center border rounded-3xl px-2 py-1 whitespace-nowrap">
                                <span className="inline-flex text-xs gap-2 text-gray-700">
                                    <File size={13} /> 0 files
                                </span>
                            </div>

                        </div>
                    </div>
                </section>

                <section className="h-full flex items-center justify-center bg-gray-50 mb-7">
                    <div className="w-full max-w-7xl p-12 flex flex-col items-start gap-5 border-2 bg-white rounded-lg">
                        <h1 className='text-xl font-bold inline-flex gap-3 '><Upload size={22} />Upload File</h1>
                        <p className='text-l text-[#4B5563]'>Share files with specific clients or keep them internal for your projects
                        </p>
                        <form action="" className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold">
                                    Select File
                                </label>
                                <Input type="file" required />
                            </div>

                            <div className="flex flex-col gap-1">

                                <label className="text-sm font-semibold">
                                    Share with Client (Optional)
                                </label>
                                <select required
                                    defaultValue=""
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md
             focus:outline-none "
                                    onChange={(e) => e.target.classList.remove("text-gray-400")}
                                >
                                    <option value="internal" defaultChecked>
                                        No client (Internal file)
                                    </option>

                                </select>
                            </div>
                            <div className="flex flex-col gap-1">

                                <label className="text-sm font-semibold">
                                    Project (Optional)
                                </label>
                                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none " placeholder="No client(Internal File)" disabled>
                                    {/* <option>No client (Independent project)</option> */}
                                </select>
                            </div>
                        </form>
                        <Button ><Upload size={22} />Upload File</Button>


                    </div>
                </section>
                <section className="min-h-[300px] flex flex-col justify-between mb-7">


                    <div className="w-full max-w-7xl mx-auto p-7 flex items-center justify-between">
                        <div className="flex items-start gap-4">
                            <h1 className="text-xl font-bold">Your Files</h1>

                            <select
                                className="h-[35px] pr-11 pl-2 bg-white border border-gray-300
                   rounded-md focus:outline-none focus:border-black
                   text-gray-600 font-medium"
                                defaultValue="internal"
                            >
                                <option value="all">All Files</option>
                                <option value="shared">Shared</option>
                                <option value="internal">Internal</option>
                            </select>
                        </div>

                        <div className="inline-flex items-center border rounded-3xl px-2 py-1">
                            <span className="inline-flex text-xs gap-2 text-gray-700">
                                <File size={13} />0 files
                            </span>
                        </div>
                    </div>


                    <p className="text-center text-gray-500 pb-6">
                        No files found. Upload your first file to get started.
                    </p>
                </section>


            </div>

        </>
    )
}
const Input = ({ className = "", ...props }) => (
    <input
        {...props}
        className={`
      w-full text-sm
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:outline-none file:border-0
      file:bg-white file:text-black
      file:font-semibold
      hover:file:bg-state-300
      border border-gray-300 rounded-md
      focus:outline-none 
      ${className}
    `}
    />
);

const Button = ({ children, className = "", ...props }) => {
    const baseStyles =
        "inline-flex items-center justify-between  px-3 py-2.5 text-sm font-semibold rounded-lg active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-black/30 gap-3";

    const defaultStyles =
        "bg-[#667CFA] text-white hover:bg-[#566BEA]";

    return (
        <button
            {...props}
            className={`${baseStyles} ${className ? className : defaultStyles
                }`}
        >
            {children}
        </button>
    );
};
export default Files
