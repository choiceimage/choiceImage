"use client";
import { useState, useEffect } from "react";
import { Calendar, Clock, Users, MapPin } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWorkshops();
  }, []);

  const fetchWorkshops = async () => {
    try {
      const response = await fetch("/api/workshops");
      if (response.ok) {
        const data = await response.json();
        setWorkshops(data.workshops);
      }
    } catch (error) {
      console.error("Failed to fetch workshops:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FA6868] to-[#91C6BC] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">Photography Workshops</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Learn from industry experts in hands-on photography workshops.
            Improve your skills and take your photography to the next level.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA6868]"></div>
            <p className="mt-4 text-gray-600">Loading workshops...</p>
          </div>
        ) : workshops.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-600">
              No workshops available at the moment
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops.map((workshop) => (
              <div
                key={workshop.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow"
              >
                <div className="relative h-64">
                  <img
                    src={workshop.image_url}
                    alt={workshop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#91C6BC] text-white px-4 py-2 rounded-full font-semibold">
                    ${parseFloat(workshop.price).toFixed(2)}
                  </div>
                </div>
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {workshop.title}
                  </h2>
                  <p className="text-gray-600 mb-6">{workshop.description}</p>

                  <div className="space-y-3 mb-6">
                    {workshop.instructor && (
                      <div className="flex items-center text-gray-700">
                        <Users className="w-5 h-5 mr-3 text-[#FA6868]" />
                        <span>Instructor: {workshop.instructor}</span>
                      </div>
                    )}
                    {workshop.duration && (
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-5 h-5 mr-3 text-[#FA6868]" />
                        <span>Duration: {workshop.duration}</span>
                      </div>
                    )}
                    {workshop.schedule_date && (
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-5 h-5 mr-3 text-[#FA6868]" />
                        <span>
                          {new Date(workshop.schedule_date).toLocaleDateString(
                            "en-US",
                            {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            },
                          )}
                        </span>
                      </div>
                    )}
                    {workshop.location && (
                      <div className="flex items-center text-gray-700">
                        <MapPin className="w-5 h-5 mr-3 text-[#FA6868]" />
                        <span>{workshop.location}</span>
                      </div>
                    )}
                    {workshop.max_participants && (
                      <div className="flex items-center text-gray-700">
                        <Users className="w-5 h-5 mr-3 text-[#FA6868]" />
                        <span>
                          Max Participants: {workshop.max_participants}
                        </span>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-[#FA6868] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e85555] transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Benefits Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Why Join Our Workshops?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-[#FA6868] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expert Instructors
              </h3>
              <p className="text-gray-600">
                Learn from experienced photographers with years of industry
                knowledge
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#91C6BC] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Hands-On Learning
              </h3>
              <p className="text-gray-600">
                Practice techniques in real-world scenarios with personalized
                feedback
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#FA6868] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Small Groups
              </h3>
              <p className="text-gray-600">
                Limited participants ensure personalized attention and better
                learning
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function Camera(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
