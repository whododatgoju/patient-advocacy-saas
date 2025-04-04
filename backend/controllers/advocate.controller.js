const User = require('../models/User.model');

// Get all advocates with filtering options
exports.getAdvocates = async (req, res, next) => {
  try {
    // Build query based on filter parameters
    const queryObj = { role: 'advocate' };
    
    // Filter by specialty if provided
    if (req.query.specialty) {
      queryObj.specialty = req.query.specialty;
    }
    
    // Filter by certifications if provided
    if (req.query.certifications) {
      const certifications = req.query.certifications.split(',');
      queryObj.certifications = { $in: certifications };
    }
    
    // Build the query
    let query = User.find(queryObj);
    
    // Sort options
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('name');
    }
    
    // Field limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('name email profilePicture specialty certifications experiences availability bio');
    }
    
    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;
    
    query = query.skip(skip).limit(limit);
    
    // Execute query
    const advocates = await query;
    
    // Get total count for pagination info
    const total = await User.countDocuments(queryObj);
    
    res.status(200).json({
      status: 'success',
      results: advocates.length,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      },
      data: {
        advocates
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get single advocate by ID
exports.getAdvocate = async (req, res, next) => {
  try {
    const advocate = await User.findOne({
      _id: req.params.id,
      role: 'advocate'
    }).select('name email profilePicture specialty certifications experiences availability bio');
    
    if (!advocate) {
      const error = new Error('No advocate found with that ID');
      error.statusCode = 404;
      return next(error);
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        advocate
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get available specialties for advocates
exports.getSpecialties = async (req, res, next) => {
  try {
    const specialties = await User.distinct('specialty', { role: 'advocate' });
    
    res.status(200).json({
      status: 'success',
      data: {
        specialties: specialties.filter(specialty => specialty) // Filter out null/undefined values
      }
    });
  } catch (error) {
    next(error);
  }
};

// Get available certifications for advocates
exports.getCertifications = async (req, res, next) => {
  try {
    const advocates = await User.find({ role: 'advocate' }).select('certifications');
    
    // Collect all certifications and remove duplicates
    const certifications = [...new Set(
      advocates.flatMap(advocate => advocate.certifications || [])
    )].filter(cert => cert); // Filter out null/undefined values
    
    res.status(200).json({
      status: 'success',
      data: {
        certifications
      }
    });
  } catch (error) {
    next(error);
  }
};

// Match patient with advocates based on quiz answers
exports.matchWithAdvocates = async (req, res, next) => {
  try {
    const {
      conditions = [],
      specialtyNeeded,
      experienceLevel,
      availabilityNeeded,
      communicationPreference
    } = req.body;
    
    // Build query based on matching criteria
    const queryObj = { role: 'advocate' };
    
    // Match by specialty if provided
    if (specialtyNeeded) {
      queryObj.specialty = specialtyNeeded;
    }
    
    // Find advocates that match the criteria
    let advocates = await User.find(queryObj)
      .select('name email profilePicture specialty certifications experiences availability bio');
    
    // Apply additional filtering based on other criteria
    if (advocates.length > 0) {
      // Filter by experience level if provided
      if (experienceLevel) {
        advocates = advocates.filter(advocate => {
          // Calculate years of experience based on experiences array
          const totalExperience = advocate.experiences.reduce((total, exp) => {
            const start = new Date(exp.startDate);
            const end = exp.endDate ? new Date(exp.endDate) : new Date();
            const years = (end - start) / (1000 * 60 * 60 * 24 * 365);
            return total + years;
          }, 0);
          
          switch (experienceLevel) {
            case 'beginner':
              return totalExperience < 2;
            case 'intermediate':
              return totalExperience >= 2 && totalExperience < 5;
            case 'expert':
              return totalExperience >= 5;
            default:
              return true;
          }
        });
      }
      
      // Filter by availability if provided
      if (availabilityNeeded) {
        const [preferredDay, preferredTime] = availabilityNeeded.split('-');
        
        advocates = advocates.filter(advocate => {
          return advocate.availability.some(slot => {
            if (preferredDay && slot.day !== preferredDay) return false;
            
            if (preferredTime) {
              // Very basic time matching for now
              if (preferredTime === 'morning' && !slot.startTime.includes('AM')) return false;
              if (preferredTime === 'afternoon' && !slot.startTime.includes('PM')) return false;
              if (preferredTime === 'evening' && parseInt(slot.startTime.split(':')[0]) < 5) return false;
            }
            
            return true;
          });
        });
      }
      
      // Calculate match score based on all criteria
      advocates = advocates.map(advocate => {
        let score = 0;
        
        // Score based on specialty match
        if (specialtyNeeded && advocate.specialty === specialtyNeeded) {
          score += 30;
        }
        
        // Score based on conditions knowledge
        if (conditions.length > 0 && advocate.bio) {
          conditions.forEach(condition => {
            if (advocate.bio.toLowerCase().includes(condition.toLowerCase())) {
              score += 10;
            }
          });
        }
        
        // Score based on certifications
        if (advocate.certifications && advocate.certifications.length > 0) {
          score += Math.min(advocate.certifications.length * 5, 20);
        }
        
        // Score based on experience
        if (advocate.experiences && advocate.experiences.length > 0) {
          score += Math.min(advocate.experiences.length * 5, 20);
        }
        
        return {
          ...advocate.toObject(),
          matchScore: score
        };
      });
      
      // Sort by match score (descending)
      advocates.sort((a, b) => b.matchScore - a.matchScore);
    }
    
    res.status(200).json({
      status: 'success',
      results: advocates.length,
      data: {
        advocates
      }
    });
  } catch (error) {
    next(error);
  }
};
