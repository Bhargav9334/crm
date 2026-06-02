import { Headphones, Mail, Phone, MapPin, Clock, Send, MessageCircle } from "lucide-react";

const Contact = () => {
  return (
    <>
    <div className="w-full min-h-screen bg-gray-50">
        <section className="max-w-7xl mx-auto p-6 " >
          <div className='text-center px-1 py-6 '>
           

              
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                <p className='text-gray-600 text-lg max-w-2xl mx-auto'>Have questions about FlowClient or need help? We're here for you! Send us a message and we'll get back to you as soon as possible.</p>
          </div>
        </section>
       <section className="w-full px-4 md:px-8 lg:px-12 py-8">
      <div className="grid grid-cols-1 gap-6 w-full">

        
       <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-stretch"> 

         <div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all h-full flex flex-col">
           <h2 className="text-3xl font-bold flex items-center gap-3"> 
              <Headphones  size={20} />
              Contact Information
            </h2>
            <p className="text-sm text-gray-500">
              Get in touch with our support team
            </p>

            
              <div className="flex items-center gap-3">
                <Mail className="text-purple-600" size={18} />
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-sm text-gray-500">
                    flowclientai@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-purple-600" size={18} />
                <div>
                  <p className="text-sm font-medium">Phone</p>
                  <p className="text-sm text-gray-500">
                    +41 79 786 88 66
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-purple-600" size={18} />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm text-gray-500">
                    Switzerland
                  </p>
                </div>
              </div>
<div className="space-y-8 mt-8">    </div>
          </div>

          <div className="bg-white border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-all h-full">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Clock size={20} />
              Business Hours
            </h2>

            <div className="flex justify-between items-center py-3 border-b">
              <span className="text-gray-600">Monday - Friday</span>
              <span className="font-medium">9:00 AM - 6:00 PM CET</span>
            </div>

            <div className="flex justify-between items-center py-3">
              <span className="text-gray-600">Saturday - Sunday</span>
              <span className="font-medium">10:00 AM - 4:00 PM CET</span>
            </div>
          </div>

          

        </div>

        

      </div>
    </section>
    </div>
    </>
  )
}

export default Contact
