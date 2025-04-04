import React, { useState, useEffect } from 'react';
import MainLayout from '../components/layout/MainLayout';
import styles from './AdvocateMatchPage.module.css';
import AdvocateCard from '../components/advocate/AdvocateCard';
import FilterSidebar from '../components/advocate/FilterSidebar';
import MatchingQuiz from '../components/advocate/MatchingQuiz';
import Testimonials from '../components/advocate/Testimonials';
import { Advocate, QuizQuestion, Testimonial, sampleAdvocates, sampleQuizQuestions, sampleTestimonials } from '../types/advocate';

const AdvocateMatchPage: React.FC = () => {
  // State for filters
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<number>(0);
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // State for mobile filter visibility
  const [showFilters, setShowFilters] = useState<boolean>(window.innerWidth > 992);
  
  // State for quiz
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [advocatesPerPage] = useState<number>(9);
  
  // State for sorting
  const [sortBy, setSortBy] = useState<string>('recommended');
  
  // State for advocates
  const [filteredAdvocates, setFilteredAdvocates] = useState<Advocate[]>([]);
  const [advocates] = useState<Advocate[]>(sampleAdvocates);
  const [quizQuestions] = useState<QuizQuestion[]>(sampleQuizQuestions);
  const [testimonials] = useState<Testimonial[]>(sampleTestimonials);
  
  // Handle window resize to reset filter visibility
  useEffect(() => {
    const handleResize = () => {
      setShowFilters(window.innerWidth > 992);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Calculate indexes for pagination
  const indexOfLastAdvocate = currentPage * advocatesPerPage;
  const indexOfFirstAdvocate = indexOfLastAdvocate - advocatesPerPage;
  const currentAdvocates = filteredAdvocates.slice(indexOfFirstAdvocate, indexOfLastAdvocate);
  const totalPages = Math.ceil(filteredAdvocates.length / advocatesPerPage);
  
  // Filter advocates based on selected filters
  useEffect(() => {
    let filtered = [...advocates];
    
    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(advocate => 
        advocate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        advocate.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    // Filter by specialties
    if (selectedSpecialties.length > 0) {
      filtered = filtered.filter(advocate => 
        selectedSpecialties.includes(advocate.specialty)
      );
    }
    
    // Filter by experience
    if (selectedExperience > 0) {
      filtered = filtered.filter(advocate => 
        advocate.experience >= selectedExperience
      );
    }
    
    // Filter by availability
    if (selectedAvailability.length > 0) {
      filtered = filtered.filter(advocate => 
        selectedAvailability.includes(advocate.availability)
      );
    }
    
    // Filter by rating
    if (selectedRating > 0) {
      filtered = filtered.filter(advocate => 
        advocate.rating >= selectedRating
      );
    }
    
    // Sort advocates
    if (sortBy === 'recommended') {
      filtered.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'experience') {
      filtered.sort((a, b) => b.experience - a.experience);
    }
    
    setFilteredAdvocates(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [
    advocates, 
    searchTerm, 
    selectedSpecialties, 
    selectedExperience, 
    selectedAvailability, 
    selectedRating,
    sortBy
  ]);
  
  // Reset all filters
  const resetFilters = () => {
    setSelectedSpecialties([]);
    setSelectedExperience(0);
    setSelectedAvailability([]);
    setSelectedRating(0);
    setSearchTerm('');
  };
  
  // Handle specialty checkbox change
  const handleSpecialtyChange = (specialty: string) => {
    if (selectedSpecialties.includes(specialty)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== specialty));
    } else {
      setSelectedSpecialties([...selectedSpecialties, specialty]);
    }
  };
  
  // Handle availability checkbox change
  const handleAvailabilityChange = (availability: string) => {
    if (selectedAvailability.includes(availability)) {
      setSelectedAvailability(selectedAvailability.filter(a => a !== availability));
    } else {
      setSelectedAvailability([...selectedAvailability, availability]);
    }
  };
  
  // Handle quiz answer selection
  const handleQuizAnswer = (questionId: number, answer: string) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer
    });
  };
  
  // Handle next question in quiz
  const handleNextQuestion = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Quiz completed - calculate matches
      calculateMatches();
      setShowQuiz(false);
      setCurrentQuestion(0);
    }
  };
  
  // Handle previous question in quiz
  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  
  // Calculate advocate matches based on quiz answers
  const calculateMatches = () => {
    // This is a simplified matching algorithm
    // A real implementation would use a more sophisticated approach
    const updatedAdvocates = advocates.map(advocate => {
      // Calculate a match percentage based on quiz answers
      // This is just a random calculation for demonstration
      const matchFactor = Math.random() * 0.3 + 0.7; // Between 70% and 100%
      return {
        ...advocate,
        matchPercentage: Math.round(matchFactor * 100)
      };
    });
    
    // Sort by match percentage
    updatedAdvocates.sort((a, b) => (b.matchPercentage || 0) - (a.matchPercentage || 0));
    
    // Update state with matched advocates
    setSortBy('recommended');
  };
  
  // Handle connect with advocate
  const handleConnectWithAdvocate = (advocateId: number) => {
    console.log(`Connecting with advocate id: ${advocateId}`);
    // In a real application, this would open a modal or redirect to a messaging interface
    alert(`You've requested to connect with advocate #${advocateId}. In the full application, this would initiate a connection.`);
  };
  
  // Toggle mobile filters
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  
  return (
    <MainLayout>
      <div className={styles.pageContainer}>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Find Your Patient Advocate</h1>
          <p className={styles.pageSubtitle}>
            Connect with experienced advocates who specialize in your specific healthcare needs.
          </p>
        </div>
        
        {/* Mobile Filter Toggle */}
        <button 
          className={styles.mobileFilterToggle}
          onClick={toggleFilters}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </button>
        
        <div className={styles.pageContent}>
          {/* Filters Sidebar */}
          <aside className={`${styles.sidebar} ${!showFilters ? styles.sidebarCollapsed : ''}`}>
            {showFilters && (
              <FilterSidebar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedSpecialties={selectedSpecialties}
                onSpecialtyChange={handleSpecialtyChange}
                selectedAvailability={selectedAvailability}
                onAvailabilityChange={handleAvailabilityChange}
                selectedExperience={selectedExperience}
                onExperienceChange={setSelectedExperience}
                selectedRating={selectedRating}
                onRatingChange={setSelectedRating}
                onResetFilters={resetFilters}
                onShowQuiz={() => setShowQuiz(true)}
              />
            )}
          </aside>
          
          {/* Main Content Area */}
          <main className={styles.mainContent}>
            {showQuiz ? (
              <MatchingQuiz
                questions={quizQuestions}
                currentQuestion={currentQuestion}
                answers={quizAnswers}
                onAnswerSelect={handleQuizAnswer}
                onNextQuestion={handleNextQuestion}
                onPrevQuestion={handlePrevQuestion}
              />
            ) : (
              <>
                {/* Results Header */}
                <div className={styles.resultsHeader}>
                  <div className={styles.resultsCount}>
                    {filteredAdvocates.length} advocates found
                  </div>
                  <div className={styles.sortOptions}>
                    <label htmlFor="sortBy">Sort by:</label>
                    <select
                      id="sortBy"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className={styles.sortSelect}
                    >
                      <option value="recommended">Best Match</option>
                      <option value="rating">Highest Rated</option>
                      <option value="experience">Most Experienced</option>
                    </select>
                  </div>
                </div>
                
                {/* Advocates Grid */}
                {filteredAdvocates.length > 0 ? (
                  <div className={styles.advocatesGrid}>
                    {currentAdvocates.map(advocate => (
                      <AdvocateCard
                        key={advocate.id}
                        {...advocate}
                        onConnect={handleConnectWithAdvocate}
                      />
                    ))}
                  </div>
                ) : (
                  <div className={styles.noResults}>
                    <h3>No matching advocates found</h3>
                    <p>Try adjusting your filters or take our matching quiz to find advocates that meet your needs.</p>
                    <button 
                      className={styles.retakeQuizBtn}
                      onClick={() => setShowQuiz(true)}
                    >
                      Take Matching Quiz
                    </button>
                  </div>
                )}
                
                {/* Pagination */}
                {filteredAdvocates.length > advocatesPerPage && (
                  <div className={styles.pagination}>
                    <button
                      className={`${styles.pageButton} ${
                        currentPage === 1 ? styles.pageButtonDisabled : ''
                      }`}
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      &laquo; Previous
                    </button>
                    <div className={styles.pageNumbers}>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
                        <button
                          key={num}
                          className={`${styles.pageNumber} ${
                            currentPage === num ? styles.activePage : ''
                          }`}
                          onClick={() => setCurrentPage(num)}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    <button
                      className={`${styles.pageButton} ${
                        currentPage === totalPages ? styles.pageButtonDisabled : ''
                      }`}
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next &raquo;
                    </button>
                  </div>
                )}
                
                {/* Testimonials */}
                <Testimonials testimonials={testimonials} />
              </>
            )}
          </main>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdvocateMatchPage;
