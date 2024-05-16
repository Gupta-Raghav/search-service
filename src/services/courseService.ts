// src/services/courseService.ts
import Course from "../models/course";

interface SearchCriteria {
  keywords?: string[];
  filters?: {
    availableCredits?: number;
    courseLevel?: string;
    categoryType?: string;
    courseCategory?: string;
    courseSubCategory?: string;
    state?: string;
    county?: string;
    institution?: string;
    country?: string;
  };
}

export const searchCourses = async (criteria: SearchCriteria) => {
  const query: any = {};

  if (criteria.keywords && criteria.keywords.length > 0) {
    query.$text = { $search: criteria.keywords.join(" ") };
  }

  if (criteria.filters) {
    if (criteria.filters.availableCredits !== undefined) {
      query.availableCredits = criteria.filters.availableCredits;
    }
    if (criteria.filters.courseLevel) {
      query.courseLevel = criteria.filters.courseLevel;
    }
    if (criteria.filters.categoryType) {
      query.categoryType = criteria.filters.categoryType;
    }
    if (criteria.filters.courseCategory) {
      query.courseCategory = criteria.filters.courseCategory;
    }
    if (criteria.filters.courseSubCategory) {
      query.courseSubCategory = criteria.filters.courseSubCategory;
    }
    if (criteria.filters.state) {
      query.state = criteria.filters.state;
    }
    if (criteria.filters.county) {
      query.county = criteria.filters.county;
    }
    if (criteria.filters.institution) {
      query.institution = criteria.filters.institution;
    }
    if (criteria.filters.country) {
      query.country = criteria.filters.country;
    }
  }

  return await Course.find(query);
};
