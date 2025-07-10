# User Acceptance Testing (UAT) for AgdayoUI

This document outlines the plan and procedures for User Acceptance Testing (UAT) of the AgdayoUI application. The purpose of this testing is to ensure that the application meets the business requirements and is ready for deployment.

## 1. Scope

This UAT will cover the following core features of the AgdayoUI application:

- User Account Management (Registration, Login, Profile Creation)
- Trip Creation and Management
- AI-based Trip Planning Assistance
- Viewing and Interacting with Trip Details

## 2. Roles and Responsibilities

- **Test Lead:** [Name/Role] - Oversees the UAT process.
- **Testers:** [Name/Role, e.g., Project Stakeholders, End Users] - Execute the test cases and provide feedback.
- **Development Team:** [Name/Role] - Stand by to address any critical issues found during testing.

## 3. Test Environment

- **URL:** [Link to Staging/UAT Environment]
- **Test Accounts:** Testers will be provided with test accounts. They can also create their own.

## 4. UAT Test Cases

Testers are to perform the steps outlined below and record the outcome.

| Test Case ID | Feature | User Story | Test Steps | Expected Result | Actual Result | Status (Pass/Fail) | Comments |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Auth** |
| UAT-001 | User Registration | As a new user, I want to create an account. | 1. Navigate to the Register page. <br> 2. Fill in email and password. <br> 3. Click "Register". | The user is successfully registered and redirected to the login or build profile page. | | | |
| UAT-002 | User Login | As an existing user, I want to log in. | 1. Navigate to the Login page. <br> 2. Enter valid credentials. <br> 3. Click "Login". | The user is successfully logged in and redirected to the main dashboard/trips page. | | | |
| UAT-003 | Build Profile | As a new user, I want to build my profile. | 1. After registration, navigate to the "Build Profile" page. <br> 2. Fill in all required fields (Home Province, etc.). <br> 3. Submit the form. | The user's profile is saved successfully. The information is visible when revisiting the profile. | | | |
| **Trip Planning** |
| UAT-004 | Create New Trip | As a user, I want to create a new trip. | 1. From the dashboard, click "Create Trip". <br> 2. Enter a Destination. <br> 3. Select travel Dates. <br> 4. Set a Budget. <br> 5. Invite companions (optional). <br> 6. Save the trip. | A new trip card appears on the main trips page with the correct details. | | | |
| UAT-005 | View Trip Details | As a user, I want to view the details of a specific trip. | 1. From the trips page, click on a trip card. <br> 2. Observe the trip details page. | The page displays the correct trip destination, dates, budget, and other planned activities. | | | |
| UAT-006 | AI Plan Generation | As a user, I want the AI to help me generate a plan. | 1. Navigate to the AI planner section. <br> 2. Input preferences (e.g., interests, pace). <br> 3. Trigger the AI generation. | The system generates a relevant and coherent travel plan based on the inputs. | | | |
| **General** |
| UAT-007 | Responsiveness | As a user, I want the app to work on my mobile device. | 1. Open the application on a mobile browser. <br> 2. Navigate through the key pages (Login, Trips, Create Trip). | The layout adjusts to the screen size, and all elements are usable and readable. | | | |

---
*This is a starting template. Please add more test cases as needed to cover all functionalities.*
