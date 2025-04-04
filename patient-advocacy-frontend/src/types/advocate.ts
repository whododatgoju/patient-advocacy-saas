export interface Advocate {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  location: string;
  tags: string[];
  experience: number;
  availability: 'available-now' | 'available-soon' | 'available-later';
  image: string;
  matchPercentage?: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
}

export interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  avatar: string;
}

// Sample data for advocates
export const sampleAdvocates: Advocate[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    specialty: "Chronic Illness",
    rating: 4.9,
    location: "New York, NY",
    tags: ["Chronic Pain", "Autoimmune", "Insurance Appeals"],
    experience: 7,
    availability: "available-now",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 95
  },
  {
    id: 2,
    name: "Michael Chen",
    specialty: "Rare Diseases",
    rating: 4.8,
    location: "Boston, MA",
    tags: ["Genetic Disorders", "Research Access", "Clinical Trials"],
    experience: 10,
    availability: "available-soon",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 88
  },
  {
    id: 3,
    name: "Amara Davis",
    specialty: "Senior Care",
    rating: 4.7,
    location: "Chicago, IL",
    tags: ["Medicare", "Aging", "Long-term Care"],
    experience: 12,
    availability: "available-later",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 76
  },
  {
    id: 4,
    name: "James Wilson",
    specialty: "Mental Health",
    rating: 4.9,
    location: "Seattle, WA",
    tags: ["Depression", "Anxiety", "Therapy Navigation"],
    experience: 5,
    availability: "available-now",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 92
  },
  {
    id: 5,
    name: "Olivia Martinez",
    specialty: "Maternal Health",
    rating: 4.8,
    location: "Los Angeles, CA",
    tags: ["Pregnancy", "Postpartum", "Fertility Issues"],
    experience: 6,
    availability: "available-soon",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 79
  },
  {
    id: 6,
    name: "David Thompson",
    specialty: "Cancer Support",
    rating: 4.9,
    location: "Houston, TX",
    tags: ["Oncology", "Treatment Options", "Clinical Trials"],
    experience: 15,
    availability: "available-now",
    image: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 84
  },
  {
    id: 7,
    name: "Sophia Wang",
    specialty: "Pediatric Advocacy",
    rating: 4.7,
    location: "San Francisco, CA",
    tags: ["Special Needs", "Education Rights", "Developmental Issues"],
    experience: 8,
    availability: "available-later",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 87
  },
  {
    id: 8,
    name: "Robert Garcia",
    specialty: "Disability Rights",
    rating: 4.8,
    location: "Denver, CO",
    tags: ["ADA Compliance", "Workplace Accommodations", "Government Benefits"],
    experience: 9,
    availability: "available-now",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 91
  },
  {
    id: 9,
    name: "Emma Patel",
    specialty: "LGBTQ+ Healthcare",
    rating: 4.9,
    location: "Atlanta, GA",
    tags: ["Gender-Affirming Care", "Mental Health", "Community Resources"],
    experience: 6,
    availability: "available-soon",
    image: "https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 94
  },
  {
    id: 10,
    name: "Marcus Johnson",
    specialty: "Veterans Affairs",
    rating: 4.7,
    location: "San Diego, CA",
    tags: ["VA Benefits", "PTSD Support", "Military Transition"],
    experience: 11,
    availability: "available-later",
    image: "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 82
  },
  {
    id: 11,
    name: "Nadia Ahmed",
    specialty: "Chronic Pain",
    rating: 4.8,
    location: "Minneapolis, MN",
    tags: ["Pain Management", "Alternative Therapies", "Disability Claims"],
    experience: 7,
    availability: "available-now",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 89
  },
  {
    id: 12,
    name: "Thomas Lee",
    specialty: "Insurance Navigation",
    rating: 4.9,
    location: "Phoenix, AZ",
    tags: ["Claims Appeals", "Coverage Maximization", "Billing Disputes"],
    experience: 13,
    availability: "available-soon",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    matchPercentage: 90
  }
];

// Sample data for quiz questions
export const sampleQuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "What type of health condition are you seeking advocacy for?",
    options: ["Chronic illness", "Acute condition", "Preventive care", "Mental health", "Other"]
  },
  {
    id: 2,
    question: "How soon do you need assistance from an advocate?",
    options: ["Immediately", "Within a week", "In the next few weeks", "In the next few months"]
  },
  {
    id: 3,
    question: "What is your primary goal in working with a patient advocate?",
    options: ["Navigate insurance issues", "Understand treatment options", "Find specialists", "Coordinate care", "Support during appointments"]
  },
  {
    id: 4,
    question: "Which of these qualities is most important to you in an advocate?",
    options: ["Experience with my condition", "Strong communication skills", "Availability", "Knowledge of healthcare systems", "Compassion and empathy"]
  },
  {
    id: 5,
    question: "Do you have any language preferences for your advocate?",
    options: ["English only", "Spanish", "Mandarin", "French", "Other", "No preference"]
  }
];

// Sample testimonials
export const sampleTestimonials: Testimonial[] = [
  {
    id: 1,
    text: "My advocate Sarah was incredible. She helped me navigate a complex insurance situation and saved me thousands of dollars in the process. I couldn't have done it without her expertise.",
    name: "John D.",
    role: "Cancer Survivor",
    avatar: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    text: "Having Michael accompany me to appointments completely changed my experience with doctors. He knew exactly what questions to ask and helped me understand my treatment options fully.",
    name: "Maria L.",
    role: "Chronic Pain Patient",
    avatar: "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    text: "As a parent of a child with special needs, finding Sophia was life-changing. She helped us secure the educational resources our son needed and taught us how to be better advocates ourselves.",
    name: "Robert K.",
    role: "Parent",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
  }
];
