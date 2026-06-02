import { React, useState } from 'react'
import { Plus, Archive, Calendar } from 'lucide-react'
import { FiCheckCircle } from 'react-icons/fi';
const TodoList = () => {
    const [activeTab, setActiveTab] = useState("active");

    return (
        <>
            <div className='w-full min-h-screen bg-gray-50 '>
                <section className="max-w-7xl mx-auto p-6 " >
                    <div className='mx-auto max-w-7xl px-1 py-1'>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">

                            <div >
                                <h2 className="text-3xl font-bold">Todo List</h2>
                                <p className='text-gray-600'>Manage your tasks and stay organized</p>

                            </div>
                        </div>
                    </div>
                </section>
                {/*todo tab*/}
                <section className="bg-gray-50 mb-7 px-3 md:px-10 lg:px-16">
                    <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
                        <div className="w-full lg:w-[360px] p-5 bg-white rounded-lg ">
                            <div className='flex flex-col mb-5'>
                                <span className='flex items-center gap-2 text-2xl font-bold'><Plus size={22} />Add New Todo</span>
                                <span className='text-gray-600'>Create a new task to stay organized</span>
                            </div>


                            <form action="" className="grid grid-cols-1 md:grid-cols-1 gap-5">
                                <div className="flex flex-col gap-1">
                                    <Input placeholder="Todo title" required />
                                </div>

                                <div className="flex flex-col gap-1 ">
                                    <textarea className="w-full h-11 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50" placeholder='Project Discription'></textarea>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black/50 cursor-pointer">
                                        <option >Low Priority</option>
                                        <option>Medium Priority</option>
                                        <option>High Priority</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <Input type="date" required />
                                </div>
                                <button className='inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold
                     text-white bg-[#667CFA] rounded-lg active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-black/30'><Plus size={16} />Add Client</button>


                            </form>


                        </div>

                        <div className='flex-1'>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 w-full max-w-2xl mx-auto">
                                <button
                                    onClick={() => setActiveTab("active")}
                                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold
      rounded-lg transition-all duration-200
      ${activeTab === "active"
                                            ? "bg-[#667CFA] text-white"
                                            : "bg-gray-200 text-black"
                                        }
    `}
                                >
                                    <Calendar size={16} />
                                    Active (0)
                                </button>

                                <button
                                    onClick={() => setActiveTab("archive")}
                                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold
      rounded-lg transition-all duration-200
      ${activeTab === "archive"
                                            ? "bg-[#667CFA] text-white"
                                            : "bg-gray-200 text-black"
                                        }
    `}
                                >
                                    <Archive size={16} />
                                    Archived (0)
                                </button>
                            </div>

                            {/*show active*/}
                            {activeTab === "active" &&
                                <div className="w-full max-w-2xl min-h-[260px] p-6
 m-auto flex flex-col border bg-white rounded-lg ">
                                    <div className='ml-5 mt-5'>
                                        <h1 className='text-xl font-bold  '>Active Tasks</h1>
                                        <p className='text-gray-600'>Tasks that need your attention</p>
                                    </div>
                                    <div className='flex flex-col items-center gap-3 mt-11'>
                                        <span>
                                            {/* <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#66ff00" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="lucide lucide-circle-check-big-icon lucide-circle-check-big"><path d="M21.801 10A10 10 0 1 1 17 3.335" /><path d="m9 11 3 3L22 4" /></svg> */}
                                            <FiCheckCircle size={50} className='text-green-500'/>
                                        </span>
                                        <p className='text-gray-600 text-center'>No active tasks! You're all caught up.</p>

                                    </div>
                                </div>

                            }

                            {activeTab === "archive" &&

                                <div className="w-full max-w-2xl min-h-[260px] p-6
 m-auto flex flex-col border bg-white rounded-lg ">
                                    <div className='ml-5 mt-5'>
                                        <h1 className='text-xl font-bold  '>Archived Tasks</h1>
                                        <p className='text-gray-600'>Tasks you've completed</p>
                                    </div>
                                    <div className='flex flex-col items-center gap-3 mt-11'>
                                        <span>
                                            <Archive size={36} color='red' />
                                        </span>
                                        <p className='text-gray-600 text-center'>No archived tasks yet.</p>

                                    </div>
                                </div>
                            }
                        </div>
                    </div>


                </section >
            </div >

        </>
    );
};
const Input = (props) => (
    <input
        {...props}
        className="w-full px-3 py-2 border border-gray-300 rounded-md
               focus:outline-none focus:ring-2 focus:ring-black/50"

    />
);

export default TodoList
