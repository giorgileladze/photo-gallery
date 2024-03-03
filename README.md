# Photo Gallery 
### [Live Project - netlify](https://main--ai-photo-gallery.netlify.app/)

## Project Overview

This project is a photo gallery application designed to showcase images in an organized and visually appealing manner. The application is structured into several common folders, each serving a specific purpose:

- **pages**: This folder contains all the page files within the project.
  
- **hooks**: The `hooks` folder contains custom hooks that are separated from other logics. These hooks handle complex operations such as infinity scrolling, local storage manipulation, and more. They encapsulate reusable logic to enhance modularity and maintainability.
  
- **assets**: The `assets` folder houses project-related icons.
  
- **components**: In the `components` folder, you'll find general components utilized in the project. These components include headers, pageNotFound displays, stats cards, and more. They are designed to be reusable across different parts of the application, promoting consistency and efficiency in development.
  
- **axios**: Within the `axios` folder, you'll encounter the Axios instance utilized in the project. This folder contains customized Axios parameters and exports a custom Axios object tailored for use within the project. This setup ensures efficient communication with backend services and facilitates seamless data exchange.

## Caching
project is caching 2 main data structure:
- **photos**: this is key - value pair object where each key is **id** of the individual image and value is **image data** itself. 
- **query**: this is key - value pair object where each key is **query** that we have already searched and the value is **array of ids**. Each cached query contains array of ids which represent image ids.

before each request custom hooks first check storage if there are any previouslly saved results to avoid api request. It also saves image stats when so it only need to send one request for image stats and it will be saved for later use;


## Installation

To run this project locally, follow these steps:

1. Clone the repository to your local machine using the following command:
2. `npm install` & `npm run dev`
3. project will start on port 3000

# NOTE: include your api token in .env file to use api 
