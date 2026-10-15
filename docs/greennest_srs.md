# GreenNest Software Requirements Specification

- [Introduction](#introduction)
- [Objectives](#objectives-of-the-project)
- [Problem Statement](#problem-statement)
- [Hardware/ Software Requirements](#hardware-software-requirements)

---

## Introduction

The thirst for learning, upgrading technical skills and applying the concepts in real life environment at a fast pace is what the industry demands from IT professionals today. However busy work schedules, far-flung locations, unavailability of convenient time-slots pose as major barriers when it comes to applying the concepts into realism. And hence the need to look out for alternative means of implementation in the form of laddered approach. 

The above truly pose as constraints especially for our students too! With their busy schedules, it is indeed difficult for our students to keep up with the genuine and constant need for integrated application which can be seen live especially so in the field of IT education where technology can change on the spur of a moment. Well, technology does come to our rescue at such times!!

Keeping the above in mind and in tune with our constant endeavour to use Technology in our training model, we at Aptech have thought of revolutionizing the way our students learn and implement the concepts using tools themselves by providing a live and synchronous eProject learning environment!

### So what is this eProject?

eProject is a step-by-step learning environment that closely simulates the classroom and Lab based learning environment into actual implementation. It is a project implementation at your fingertips!! An electronic, live juncture on the machine that allows you to:

* Practice step by step i.e. laddered approach.
* Build a larger more robust application.
* Usage of certain utilities in applications designed by user.
* Single program to unified code leading to a complete application.
* Learn implementation of concepts in a phased manner.
* Enhance skills and add value.
* Work on real life projects. 
* Give a real life scenario and help to create applications more complicated and useful.
* Mentoring through email support.

The students at the centre are expected to complete this eProject and send complete project along with the documentation to eProjects Team. Looking forward to a positive response from your end!!

## Objectives of the project

The objective of GreenNest is to give students a practical website project in plant discovery and home gardening. Students will build an integrated application using responsive layouts, reusable components and client-side data handling.

The objective is to apply concepts from the Website Design module through a realistic scenario, rather than introduce a new programming course.
You can revise the chapters before you start with the project. 

This project is intended for students who have completed the Website Design module. Implement it during lab sessions with faculty assistance where required. It is very essential that a student has a clear understanding of the subject. Students should go through the project and solve the assignments as per requirements given. 

Kindly get back to eProjects Team in case of any doubts regarding the application or its objectives.

## Problem Statement

### Introduction
New home gardeners often struggle to select plants suited to their space, sunlight and maintenance routine. Plant care information is scattered and difficult to compare.

GreenNest is a responsive gardening discovery portal that helps visitors choose suitable plants, understand care routines, learn from gardener profiles and maintain a personal plant collection.

The portal should enable users to:
* Explore plants by plant category and growing environment.
* Search plants using keywords.
* Filter plants by growing environment, plant category, light requirement and watering frequency.
* View detailed information about individual plants.
* Learn about gardener profiles and their specialisations.
* Browse plant images through an interactive gallery.
* Save favourite plants using browser Local Storage.
* Discover related plants and curated collections.
* Navigate the website on desktop, tablet and mobile devices.

The project demonstrates responsive web technologies and AI-assisted development tools through a usable discovery and planning experience.

## Functional Requirement Specification

Develop the portal as a responsive React Single Page Application with reusable components, local sample data and browser-based interactions. Required functionality is front-end only; authentication, payments, live booking and backend services are outside the project scope.

### 1. Home and Landing Page
* Provide an attractive GreenNest introduction and visual identity.
* Display featured plants and curated collections.
* Provide quick access to the plant directory and major categories.
* Provide a prominent search option.
* Explain the purpose and main features of GreenNest.

### 2. Plants Directory
* Display plant records in a responsive card grid.
* Show plant name, growing environment, plant category and a representative image.
* Allow users to open the complete plant details view.
* Provide a minimum of 20 distinct sample plant records with stable identifiers.

### 3. Smart Search and Filtering
* Allow case-insensitive search by plant name, keyword or growing environment.
* Provide filters for plant category, growing environment, light requirement and watering frequency.
* Combine active search and filters and provide a clear-all option.
* Display the result count and an appropriate no-match message.

### 4. Plant Details Page
* Display plant name, botanical name and representative images.
* Show suitable growing environments and basic plant characteristics.
* Describe light, soil and container requirements.
* Describe watering and routine care guidance.
* Provide growth habits and clearly labelled handling or toxicity cautions from attributed sources.
* Show plants with similar care needs.
* Provide an option to save the plant to My Garden.

### 5. Gardener Profiles
* Display gardener information associated with selected plants.
* Show gardener name, background and specialisation.
* Provide a short biography and gardening interests.
* Display associated plants or gardening projects.

### 6. Interactive Plant Gallery
* Display plant images in a responsive gallery.
* Provide an image preview or lightbox view.
* Allow previous and next navigation and keyboard dismissal.
* Provide meaningful image alternatives, captions and image credits.

### 7. Growing Environment Explorer
* Provide discovery organised by growing environment.
* Allow users to choose a growing environment and view matching plants.
* Present explanatory labels and a clear selected state.
* Use a labelled visual selector; a live map or external service is not required.

### 8. Seasonal Gardening Collections
* Provide curated collections such as balcony plants, low maintenance plants, indoor foliage and seasonal flowers.
* Display collections using reusable React components.
* Allow users to open individual plant details from each collection.

### 9. Favourites and Bookmarks
* Allow visitors to save and unsave selected plants.
* Store unique record identifiers using browser Local Storage.
* Provide a saved plants view and retain it after page reload.
* Allow removal without duplicates and display an empty saved-list state.

### 10. About GreenNest
* Explain the purpose and scope of GreenNest.
* Explain how visitors can use the plant discovery and home gardening features.
* Describe content categories, sample data and source or asset acknowledgements.

### 11. Contact Us
* Provide a contact form with name, email and message fields.
* Validate required fields and email format on the client side.
* Display an explicit demonstration confirmation after valid submission.
* Do not claim that a message was sent; no backend delivery is required.

### 12. Navigation and Common UI
* Provide a consistent header and navigation menu across views.
* Provide footer information and useful links.
* Provide breadcrumbs or a return link on detail pages.
* Support keyboard navigation and visible focus states.
* Provide a responsive mobile menu with an accessible open and close control.

### 13. Interactive User Interface Features
* Provide a care checklist for plants saved in My Garden.
* Allow users to mark care tasks complete and reset them.
* Store checklist state in browser Local Storage.
* Present suggested care intervals as guidance rather than automatic diagnoses.
* Provide clear empty, validation and storage failure messages.

### 14. AI Assisted Development and Design
* Figma Toolkit with AI plugins may assist wireframes and layout exploration.
* VS Code with AI extensions may assist coding, debugging and documentation.
* Students must understand, review and explain the submitted source code.
* Review AI-generated code and assets for accuracy, usability and permitted use before submission.

## Non-Functional Requirements

The system should:
* Work consistently across current desktop and mobile browsers.
* Adapt to desktop, tablet and mobile layouts without horizontal content overflow.
* Validate user inputs; do not collect passwords or sensitive personal data in this front-end project.
* Optimise images and assets and keep search and filter interactions responsive.
* Handle empty results and unavailable Local Storage gracefully; AI tools support development only.
* Provide readable contrast, meaningful image alternatives, keyboard navigation and visible focus states.

## Hardware/ Software Requirements

### Hardware 
* Intel Core i5/i7 Processor
* 8 GB RAM or above
* 500 GB HDD/SSD
* Internet Connectivity

### Software [Either or Combination as per Course/Sem]
* Visual Studio Code or a suitable HTML and JavaScript editor
* Node.js and npm compatible with the selected React version
* HTML5, CSS3 and JavaScript ES6 or higher
* Figma Toolkit with optional AI plugins
* React 18.x or higher with a suitable build tool
* Modern web browsers and optional reviewed AI coding extensions

## Project Deliverables

You will design and build the project and submit it along with a complete project report that includes:

* Problem Definition
* Design specifications
* Diagrams such as flowcharts for various activities, Data Flow Diagrams etc.
* Source Code
* Test Data Used in the Project
* Project Installation Instructions (if any)

Documentation is considered a very important part of the project. Ensure that documentation is complete and comprehensive. The consolidated project will be submitted as a zip file with a ReadMe.doc file listing assumptions (if any) made.

Submit a video clip demonstrating the working of the Website. Optionally, a live hosted URL can be supplied for the site. Over and above the given specifications, you can apply your creativity and logic to improve the portal.