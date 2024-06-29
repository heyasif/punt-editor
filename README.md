# Punt Partners Text Editor

This is a simple text editor application built using React, TypeScript, and Chakra UI. The application allows users to select a font family, variant, and toggle italic styling. It also features autosave functionality to preserve text and settings between sessions.

## Features

- **Font Family Selector**: Choose from a list of Google Fonts.
- **Font Weight Selector**: Select the appropriate font weight for the chosen font family.
- **Italic Toggle**: Toggle italic styling for the selected font family and weight combination.
- **Autosave**: Automatically save the text, font family, and font weight in local storage.
- **Reset**: Reset the text and settings to default values.
- **Responsive Design**: The application is responsive and adjusts to different screen sizes.

## Live Demo

Check out the live demo of the app [here](https://punt-editor-99gn.vercel.app/).

## Screenshots

![Screenshot 1](https://github.com/heyasif/punt-editor/blob/main/src/assets/Home.png?raw=true)

## Installation and Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 7 or higher)

### Clone the Repository

```bash
git clone https://github.com/heyasif/punt-editor.git
cd punt-editor
```

### Install Dependencies

```bash
npm install
```

### Running the Application Locally

```bash
npm run dev
```

This will start the development server and you can view the application at `http://localhost:3000`.

### Building the Application

```bash
npm run build
```

This will create an optimized production build of the application in the `dist` folder.

## Assumptions and Improvements

- The application currently supports a predefined list of Google Fonts.
- Additional features such as text alignment, color selection, and more can be added to enhance the functionality.
- Error handling for unsupported font-variant combinations is implemented.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries, please contact Mohd Asif at hellomohdasif@gmail.com.

---
