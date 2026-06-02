import { Plus, Workflow, Clock3 } from 'lucide-react'
import { useState } from 'react'
const Onboarding = () => {
    const [showWork, setShowWork] = useState(true);
    const [showExecution, setShowExecution] = useState(false);
    const [activeTab, setActiveTab] = useState("Workflows");

    return (
        <>
            <div className="min-h-screen bg-gray-50 ">
                <section className="w-full p-6 " >
                    <div className='mx-auto max-w-7xl px-6 py-6'>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8">

                            <div >
                                <h2 className="text-4xl font-bold text-gray-900">Automated Onboarding</h2>
                                <p className='text-gray-600 font-medium'>Create automated workflows to welcome and onboard new clients</p>

                            </div>


                            <button className='inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                     text-white bg-[#667CFA] rounded-lg active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-black/30' ><Plus size={16} />New Workflow</button>

                        </div>
                    </div>
                </section>
                <section className="mx-auto w-full max-w-7xl">
                    <div className="inline-flex p-1 bg-gray-100 rounded-xl">

                        <button
                            onClick={() => {
                                setShowWork(true);
                                setShowExecution(false);
                                setActiveTab("Workflows");
                            }}
                            className={`px-5 py-2 text-sm font-medium rounded-lg
        transition-all duration-150
        ${activeTab === "Workflows"
                                    ? "bg-white text-black shadow-sm"
                                    : "text-gray-500"
                                }`}
                        >
                            Workflows
                        </button>

                        <button
                            onClick={() => {
                                setShowWork(false);
                                setShowExecution(true);
                                setActiveTab("Execution");
                            }}
                            className={`px-5 py-2 text-sm font-medium rounded-lg
        transition-all duration-150
        ${activeTab === "Execution"
                                    ? "bg-white text-black shadow-sm"
                                    : "text-gray-500"
                                }`}
                        >
                            Execution History
                        </button>

                        <button
                            onClick={() => {
                                setShowWork(false);
                                setShowExecution(false);
                                setActiveTab("Templates");
                            }}
                            className={`px-5 py-2 text-sm font-medium rounded-lg
        transition-all duration-150
        ${activeTab === "Templates"
                                    ? "bg-white text-black shadow-sm"
                                    : "text-gray-500"
                                }`}
                        >
                            Templates
                        </button>

                    </div>
                </section>



                {showWork &&
                    <section className="h-full flex items-center justify-center bg-gray-50 mb-7">
                        <div className="w-full max-w-7xl p-12 flex flex-col items-start gap-5 border-2 bg-white rounded-lg">
                            <div className="w-full max-w-7xl p-6 flex flex-col items-center gap-5">
                                <span className="text-gray-400"><Workflow size={48} /></span>
                                <h1 className="text-xl font-semibold font-sans">No workflows yet</h1>
                                <h2 className="text-l text-[#4B5563] font-sans">Create your first automated onboarding workflow to get started.</h2>
                                <button className='inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                     text-white bg-[#667CFA] rounded-lg active:scale-95
                     transition-all duration-200
                     focus:outline-none focus:ring-2 focus:ring-black/30 ' ><Plus size={16} />Create First Workflow</button>
                            </div>


                        </div>
                    </section>

                }
                {showExecution &&
                    <section className="h-full flex items-center justify-center bg-gray-50 mb-7">
                        <div class="w-full max-w-7xl p-12 flex flex-col items-start gap-5 border-2 bg-white rounded-lg">
                            <h1 className='text-2xl font-semibold  -tracking-tight leading-none'>Recent Executions</h1>
                            <div className="w-full max-w-7xl p-6 flex flex-col items-center gap-5">
                                <span className="text-gray-400"><Clock3 size={48} /></span>
                                {/* <h1 className="text-xl font-semibold font-sans">No workflows yet</h1> */}
                                <p className="text-l text-[#4B5563] font-sans font-medium">No workflows yet</p>
                            </div>


                        </div>
                    </section>

                }
            </div>
        </>
    )
}

export default Onboarding
