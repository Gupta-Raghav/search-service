import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import csv from 'csv-parser';
import Course from './models/course'; // Adjust the import path based on your project structure

interface CourseType {
    name: string;
    description: string;
    availableCredits: number;
    courseLevel: string;
    categoryType: string;
    courseCategory: string;
    courseSubCategory: string;
    state: string;
    county: string;
    institution: string;
    country: string;
  }

// Function to seed the database
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://localhost:27017/courses")
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch(err => {
      console.error("Error connecting to MongoDB:", err.message);
    });

    console.log('Connected to MongoDB');

    // Path to the CSV file
    const filePath = path.join(__dirname, "../course_master.csv");

    const courses: CourseType[] = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Transform the row data to match your MongoDB schema
        const course: CourseType = {
          name: row.course_sdesc || '',
          description: row.course_ldescr || '',
          availableCredits: parseInt(row.available_course_credit_value, 10) || 0,
          courseLevel: row.course_level_type_value || '',
          categoryType: row.course_cat_type_name || '',
          courseCategory: row.course_catname || '',
          courseSubCategory: row.course_subcat_name || '',
          state: row.statecode || '',
          county: row.county_off_in_grade || '',
          institution: row.state_off_in_grade || '',
          country: 'USA', // Assuming country is not available in the CSV and setting it to a default value
        };

        // Check if required fields are present
        if (
          course.name &&
          course.description &&
          course.availableCredits &&
          course.courseLevel &&
          course.categoryType &&
          course.courseCategory &&
          course.courseSubCategory &&
          course.state &&
          course.county &&
          course.institution &&
          course.country
        ) {
          courses.push(course);
        }
      })
      .on('end', async () => {
        try {
          // Insert the data into MongoDB
          if (courses.length > 0) {
            await Course.insertMany(courses);
            console.log('Courses have been seeded successfully');
          } else {
            console.log('No valid courses found to seed.');
          }
          mongoose.connection.close();
        } catch (error) {
          console.error('Error inserting courses:', error);
          mongoose.connection.close();
        }
      });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Run the seed function
seedDatabase();