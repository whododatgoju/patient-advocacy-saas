# Advocate Match Page - Component Architecture

## Component Hierarchy

```
AdvocateMatchPage
├── MainLayout
│   └── (Header, Navigation, Footer)
├── FilterSidebar
│   ├── Search Input
│   ├── Specialty Filters
│   ├── Availability Filters
│   ├── Experience Filter
│   ├── Rating Filter
│   └── Reset Filters Button
├── MatchingQuiz (conditionally rendered)
│   ├── Question Display
│   ├── Answer Options
│   ├── Progress Bar
│   └── Navigation Buttons
└── Main Content
    ├── Results Header
    │   ├── Results Count
    │   └── Sort Options
    ├── Advocates Grid
    │   └── Multiple AdvocateCard components
    ├── Pagination Controls
    └── Testimonials section
```

## Data Flow

```
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│  Filter States  │◄────────┤  FilterSidebar  │
│                 │         │                 │
└────────┬────────┘         └─────────────────┘
         │
         ▼
┌─────────────────┐         ┌─────────────────┐
│                 │         │                 │
│ Filtered Results │────────►│ Advocates Grid  │
│                 │         │                 │
└────────▲────────┘         └─────────────────┘
         │
┌────────┴────────┐         ┌─────────────────┐
│                 │         │                 │
│   Quiz States   │◄────────┤  MatchingQuiz   │
│                 │         │                 │
└─────────────────┘         └─────────────────┘
```

## Component Responsibilities

### AdvocateMatchPage

- Main container component
- Manages state for filters, quiz, pagination, and advocates
- Coordinates data flow between child components

### FilterSidebar

- Displays all filtering options
- Emits events when filters are changed
- Provides interface for quiz initiation

### MatchingQuiz

- Displays quiz questions and handles user answers
- Tracks quiz progress
- Emits completion event with quiz results

### AdvocateCard

- Displays individual advocate information
- Handles "Connect" button clicks
- Shows match percentage when available

### Testimonials

- Displays patient testimonials in a responsive grid

## State Management

The main state is managed in the parent AdvocateMatchPage component:

1. **Filter States**:
   - `selectedSpecialties`: Array of selected specialties
   - `selectedExperience`: Minimum years of experience
   - `selectedAvailability`: Array of availability options
   - `selectedRating`: Minimum rating value
   - `searchTerm`: Text search input

2. **Quiz States**:
   - `showQuiz`: Boolean to toggle quiz visibility
   - `currentQuestion`: Index of current question
   - `quizAnswers`: Record of answers by question ID

3. **Pagination States**:
   - `currentPage`: Current page number
   - `advocatesPerPage`: Number of advocates per page

4. **Data States**:
   - `advocates`: Original list of advocates
   - `filteredAdvocates`: Filtered list based on active filters
   - `quizQuestions`: List of quiz questions
   - `testimonials`: List of testimonials

## Event Handling

- Filter changes trigger useEffect to recalculate filtered advocates
- Quiz completion triggers advocate matching algorithm
- Pagination controls update the current page
- Sorting options reorder the advocates list
