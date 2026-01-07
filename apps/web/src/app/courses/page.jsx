"use client";
import { useState, useEffect } from "react";
import { BookOpen, Clock, Award, Video } from "lucide-react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLevel, setSelectedLevel] = useState("");

  useEffect(() => {
    fetchCourses();
  }, [selectedLevel]);

  const fetchCourses = async () => {
    try {
      let url = "/api/courses?";
      if (selectedLevel) url += `level=${selectedLevel}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setCourses(data.courses);
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    } finally {
      setLoading(false);
    }
  };

  const getLevelColor = (level) => {
    switch (level?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#FA6868] to-[#91C6BC] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Online Photography Courses
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Master photography at your own pace with our comprehensive online
            courses. From fundamentals to advanced techniques.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Filter by Level
            </label>
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FA6868] focus:border-transparent"
            >
              <option value="">All Levels</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#FA6868]"></div>
            <p className="mt-4 text-gray-600">Loading courses...</p>
          </div>
        ) : courses.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <p className="text-xl text-gray-600">No courses available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow flex flex-col"
              >
                <div className="relative h-48">
                  <img
                    src={course.image_url}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  {course.level && (
                    <span
                      className={`absolute top-4 left-4 px-3 py-1 rounded-full font-semibold text-sm ${getLevelColor(course.level)}`}
                    >
                      {course.level.charAt(0).toUpperCase() +
                        course.level.slice(1)}
                    </span>
                  )}
                  <div className="absolute top-4 right-4 bg-[#91C6BC] text-white px-4 py-2 rounded-full font-semibold">
                    ${parseFloat(course.price).toFixed(2)}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {course.title}
                  </h2>
                  <p className="text-gray-600 mb-4 flex-1">
                    {course.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {course.instructor && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Award className="w-4 h-4 mr-2 text-[#FA6868]" />
                        <span>{course.instructor}</span>
                      </div>
                    )}
                    {course.duration && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Clock className="w-4 h-4 mr-2 text-[#FA6868]" />
                        <span>{course.duration}</span>
                      </div>
                    )}
                    {course.lessons_count && (
                      <div className="flex items-center text-gray-700 text-sm">
                        <Video className="w-4 h-4 mr-2 text-[#FA6868]" />
                        <span>{course.lessons_count} Lessons</span>
                      </div>
                    )}
                  </div>

                  <button className="w-full bg-[#FA6868] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#e85555] transition-colors">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Course Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-[#FA6868] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Video className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                HD Video Lessons
              </h3>
              <p className="text-gray-600 text-sm">
                High-quality video content with clear explanations
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#91C6BC] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Learn at Your Pace
              </h3>
              <p className="text-gray-600 text-sm">
                Lifetime access to course materials
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#FA6868] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Downloadable Resources
              </h3>
              <p className="text-gray-600 text-sm">
                PDF guides, checklists, and templates
              </p>
            </div>
            <div className="text-center">
              <div className="bg-[#91C6BC] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Certificate
              </h3>
              <p className="text-gray-600 text-sm">
                Receive a certificate upon completion
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
