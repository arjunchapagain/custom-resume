# Resume Tracker Web Application

## Overview

This is a full-stack web application for creating and managing resume templates and tracking job applications. The application allows users to create dynamic resume templates with placeholders, fill in their information, preview the final resume, and export to PDF. It's built with a modern tech stack featuring React frontend, Express backend, and PostgreSQL database with Drizzle ORM.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Rich Text Editor**: TipTap for template editing
- **State Management**: Custom hooks with local storage persistence
- **Routing**: Wouter for client-side navigation
- **Data Fetching**: TanStack React Query for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database ORM**: Drizzle ORM
- **Build Tool**: Vite for frontend, esbuild for backend
- **Development**: Hot module replacement and live reloading

### Database Schema
- **Database**: PostgreSQL (configured via Neon Database)
- **ORM**: Drizzle with migrations support
- **Schema Location**: `shared/schema.ts` for type sharing between frontend/backend
- **Current Tables**: Users table with authentication fields

## Key Components

### Template Engine (`client/src/lib/template-engine.ts`)
- Processes resume templates with `{{placeholder}}` syntax
- Extracts placeholders from templates automatically
- Validates template syntax and structure
- Replaces placeholders with user data for preview/export

### Resume Store (`client/src/hooks/use-resume-store.ts`)
- Custom hook managing resume state with localStorage persistence
- Handles template content, form data, and auto-save functionality
- Tracks detected placeholders and save status
- Provides real-time updates across components

### PDF Export (`client/src/lib/pdf-export.ts`)
- html2pdf.js integration for client-side PDF generation
- Configurable paper sizes (A4, Letter, Legal)
- Metadata support and quality optimization
- Error handling with user feedback

### UI Components
- **Editor**: TipTap rich text editor with formatting toolbar
- **Forms**: Comprehensive form with validation for all resume fields
- **Preview**: Live preview with zoom controls and export options
- **Sidebar**: Navigation between template editing, form filling, and preview
- **Responsive Design**: Mobile-friendly layout with adaptive components

## Data Flow

1. **Template Creation**: User creates/edits resume template using TipTap editor
2. **Placeholder Detection**: Template engine automatically extracts `{{field}}` placeholders
3. **Form Generation**: Dynamic form fields generated based on detected placeholders
4. **Real-time Preview**: As user fills form, preview updates instantly
5. **Export**: PDF generation from rendered HTML with user customizations
6. **Persistence**: All data auto-saved to localStorage with status indicators

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL connection for serverless environments
- **drizzle-orm**: Type-safe database ORM with migration support
- **@tanstack/react-query**: Server state management and caching
- **@tiptap/react**: Rich text editor for template creation
- **html2pdf.js**: Client-side PDF generation
- **react-hook-form**: Form state management with validation

### UI Framework
- **@radix-ui/***: Accessible UI primitives for all interactive components
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **lucide-react**: Icon library

### Development Tools
- **vite**: Frontend build tool with HMR
- **esbuild**: Fast backend bundling
- **drizzle-kit**: Database migration and introspection tools
- **tsx**: TypeScript execution for development

## Deployment Strategy

### Build Process
- **Frontend**: Vite builds optimized React bundle to `dist/public`
- **Backend**: esbuild bundles Express server to `dist/index.js`
- **Database**: Drizzle migrations applied via `db:push` command

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment detection (development/production)
- **Development**: Hot reloading with Vite middleware integration
- **Production**: Static file serving with Express

### Scalability Considerations
- **Database**: Uses connection pooling via Neon serverless driver
- **Storage**: Currently localStorage-based, ready for backend persistence
- **Authentication**: Basic user schema in place for future multi-user support
- **File Storage**: PDF generation is client-side, no server storage required

### ATS Optimization Features
- **ATS-Friendly Formatting**: Uses standard Arial font and simple HTML structure
- **Clean Text Hierarchy**: Uses proper heading tags (H1, H2, H3) for section organization
- **Standard Colors**: Uses high contrast black text (#000000) on white background
- **Simple Layout**: Avoids complex CSS that might interfere with text parsing
- **Structured Data**: Clear sections with consistent formatting patterns
- **Readable Fonts**: Uses Arial/Helvetica family preferred by ATS systems

### Current Implementation Status
- ✅ Database integration with PostgreSQL for resume persistence
- ✅ Auto-save functionality with 2-second debouncing
- ✅ ATS-optimized template with clean HTML structure
- ✅ Empty field removal to prevent blank sections
- ✅ Professional formatting with section dividers
- ✅ PDF export with ATS-friendly styling

### Current Limitations
- Single-user application (no authentication implemented)
- No job application tracking features (planned but not implemented)
- PDF export quality depends on browser capabilities

The architecture is designed for easy extension to multi-user functionality and additional features like job application tracking, with clean separation between frontend state management and backend data persistence.