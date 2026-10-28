# Language Tutor Management System

A full-stack, enterprise-grade web application for managing language tutors, connecting students with educators, and tracking tutoring availability and hourly rates. Built with **Spring Boot** and **React (Vite + Bootstrap)** following strict layered architecture principles.

---

## 📋 Table of Contents
- [Architecture Overview](#architecture-overview)
- [Technology Stack](#technology-stack)
- [Project Directory Structure](#project-directory-structure)
- [Backend Layered Architecture](#backend-layered-architecture)
- [Database & Entity Schema](#database--entity-schema)
- [REST API Reference](#rest-api-reference)
- [Frontend Features & Design](#frontend-features--design)
- [Prerequisites & System Requirements](#prerequisites--system-requirements)
- [Local Setup & Running Guide](#local-setup--running-guide)
  - [1. Database Setup](#1-database-setup)
  - [2. Running the Backend](#2-running-the-backend)
  - [3. Running the Frontend](#3-running-the-frontend)
- [Run with Docker Compose](#run-with-docker-compose)
- [Verification & Testing Checklist](#verification--testing-checklist)
- [Git & Ignore Policies](#git--ignore-policies)

---

## 🏛 Architecture Overview

The system is decoupled into two primary components communicating over RESTful HTTP APIs:
- **Backend**: Spring Boot 4 REST API server connected to PostgreSQL via Spring Data JPA and Hibernate.
- **Frontend**: Single Page Application (SPA) powered by React 19, React Router v7, Vite, and Bootstrap 5.

```
┌─────────────────────────────────┐          ┌──────────────────────────────────┐          ┌──────────────────────┐
│   React SPA (Vite + Bootstrap)  │ ──HTTP──> │  Spring Boot REST API (Port 8080) │ ──JDBC──> │  PostgreSQL Database │
│   http://localhost:5173         │ <──JSON── │  com.klef.soa.docker              │ <──────── │   Port 5432          │
└─────────────────────────────────┘          └──────────────────────────────────┘          └──────────────────────┘
```

---

## 🛠 Technology Stack

### Backend
| Technology | Version / Purpose |
| :--- | :--- |
| **Java JDK** | 21 |
| **Spring Boot** | 4.1.x Starter Framework |
| **Spring Data JPA** | Data Access Layer with Hibernate ORM 7.x |
| **PostgreSQL JDBC Driver** | JDBC Driver for PostgreSQL |
| **Spring Validation** | Jakarta Bean Validation (`@Valid`, `@NotBlank`, `@DecimalMin`, etc.) |
| **SpringDoc OpenAPI** | Swagger UI and OpenAPI v3 interactive documentation |
| **Maven** | Dependency management & Maven Wrapper (`mvnw` / `mvnw.cmd`) |

### Frontend
| Technology | Version / Purpose |
| :--- | :--- |
| **React** | 19.3.x |
| **React DOM** | 19.3.x |
| **Vite** | 8.3.x Modern Build Tool & Dev Server |
| **React Router DOM** | 7.18.x Client-side SPA routing |
| **Bootstrap** | 5.3.x Responsive CSS and component system |
| **Axios** | 1.20.x HTTP client for backend REST calls |

---

## 📂 Project Directory Structure

```
DockerProject/
├── .gitignore                     # Unified root gitignore (Java, Node, IDEs, OS)
├── README.md                      # Comprehensive project documentation
├── LanguageTutorBackend/          # Spring Boot Backend Service
│   ├── .gitignore
│   ├── mvnw / mvnw.cmd            # Maven Wrapper
│   ├── pom.xml                    # Maven configuration and dependencies
│   └── src/
│       ├── main/
│       │   ├── java/com/klef/soa/docker/
│       │   │   ├── LanguageTutorBackendApplication.java  # Main Application Class
│       │   │   ├── configuration/                        # CORS & Swagger Configuration
│       │   │   │   ├── CorsConfig.java
│       │   │   │   └── SwaggerConfig.java
│       │   │   ├── controller/                           # REST Controller Layer
│       │   │   │   └── LanguageTutorController.java
│       │   │   ├── dto/                                  # Data Transfer Objects
│       │   │   │   ├── TutorRequest.java
│       │   │   │   └── TutorResponse.java
│       │   │   ├── entity/                               # JPA Entities
│       │   │   │   └── LanguageTutor.java
│       │   │   ├── exception/                            # Global Error Handling
│       │   │   │   ├── GlobalExceptionHandler.java
│       │   │   │   └── ResourceNotFoundException.java
│       │   │   ├── repository/                           # Spring Data JPA Repository
│       │   │   │   └── LanguageTutorRepository.java
│       │   │   ├── service/                              # Service interface and implementation
│       │   │   │   ├── LanguageTutorService.java
│       │   │   │   └── LanguageTutorServiceImpl.java
│       │   └── resources/
│       │       └── application.properties                # Spring Boot Config
│       └── test/
│           └── java/com/klef/soa/docker/
│               └── LanguageTutorBackendApplicationTests.java
└── LanguageTutorFrontend/         # React SPA Frontend
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.css                # Polished design tokens and styles
        ├── App.jsx                # Layout, routes, and navigation
        ├── index.css              # Typography and base styling
        ├── main.jsx               # React entry point
        ├── components/
        │   ├── ConfirmDelete.jsx  # Accessible modal dialog for safe deletions
        │   ├── LoadingSpinner.jsx # Polished loading indicator
        │   ├── MessageAlert.jsx   # Success/Error alert banner
        │   └── Navbar.jsx         # Responsive navigation bar
        ├── pages/
        │   ├── AddTutor.jsx       # Form to add tutor (no ID field)
        │   ├── Dashboard.jsx      # Metrics overview (total, available, unavailable)
        │   ├── EditTutor.jsx      # Form to update existing tutor
        │   ├── NotFound.jsx       # 404 Not Found fallback view
        │   └── TutorList.jsx      # Search, filter, view table, refresh, and delete
        └── services/
            └── tutorService.js    # Axios client with centralized error formatting
```

---

## 📦 Backend Layered Architecture

The backend strictly conforms to the required layered architecture under the base package `com.klef.soa.docker`:

1. **`configuration`**:
   - `CorsConfig`: Restricts cross-origin requests to localhost development origins.
   - `SwaggerConfig`: Initializes OpenAPI 3.0 metadata for interactive API exploration.
2. **`entity`**:
   - `LanguageTutor`: JPA Entity mapped to table `LanguageTutor_table`. Contains primary key generated via `GenerationType.IDENTITY`.
3. **`repository`**:
   - `LanguageTutorRepository`: Extends `JpaRepository<LanguageTutor, Long>` for out-of-the-box CRUD and query capabilities.
4. **`service`**:
   - `LanguageTutorService`: Defines contract for tutor management business logic.
5. **`service` implementation**:
   - `LanguageTutorServiceImpl`: Implements business operations with Spring `@Transactional` management and repository calls.
6. **`dto`**:
   - `TutorRequest`: Input payload carrying validation rules (`@NotBlank`, `@DecimalMin`, `@NotNull`, `@Size`).
   - `TutorResponse`: Outgoing response payload decoupling the persistent entity from API clients.
7. **`controller`**:
   - `LanguageTutorController`: Exposes REST endpoints on `/api/tutors` with appropriate HTTP status codes (e.g. `201 CREATED`, `200 OK`, `400 BAD REQUEST`, `404 NOT FOUND`).
8. **`exception`**:
   - `GlobalExceptionHandler`: `@RestControllerAdvice` converting `MethodArgumentNotValidException`, `ResourceNotFoundException`, and malformed payloads into standard JSON error objects with clear status codes and field error messages.

---

## 🗄 Database & Entity Schema

### Table: `LanguageTutor_table`

| Column | Data Type | Constraints | Description |
| :--- | :--- | :--- | :--- |
| `id` | `BIGINT` | Primary Key, Auto-Increment | System-generated Unique Tutor ID (never entered by user) |
| `tutor_name` | `VARCHAR(100)` | NOT NULL, Max: 100 | Full name of the tutor |
| `language` | `VARCHAR(60)` | NOT NULL, Max: 60 | Language taught |
| `hourly_fee` | `DOUBLE` | NOT NULL, Min: > 0.0 | Rate per hour in dollars |
| `available` | `BIT(1)` / `BOOLEAN` | NOT NULL | Tutor availability status (`true` / `false`) |

---

## 🌐 REST API Reference

Base URL: `http://localhost:8080/api/tutors`

| Method | Endpoint | Description | Request Body | Success Code |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/status` | Service health check | None | `200 OK` |
| **GET** | `/displayall` | Retrieve all tutors | None | `200 OK` |
| **GET** | `/display/{id}` | Retrieve tutor by ID | None | `200 OK` (or `404 NOT FOUND`) |
| **POST** | `/addtutor` | Register a new tutor | `TutorRequest` JSON | `201 CREATED` |
| **PUT** | `/update/{id}` | Update existing tutor | `TutorRequest` JSON | `200 OK` (or `404 NOT FOUND`) |
| **DELETE** | `/delete/{id}` | Delete tutor by ID | None | `200 OK` (or `404 NOT FOUND`) |

### Sample JSON Payloads

#### Create Tutor (`POST /api/tutors/addtutor`)
*Notice: ID is intentionally omitted; the backend and database assign it automatically.*
```json
{
  "tutorName": "Elena Rostova",
  "language": "Russian",
  "hourlyFee": 45.00,
  "available": true
}
```

#### Successful Response (`201 CREATED`)
```json
{
  "id": 1,
  "tutorName": "Elena Rostova",
  "language": "Russian",
  "hourlyFee": 45.0,
  "available": true
}
```

#### Validation Error Response (`400 BAD REQUEST`)
When sending invalid or empty data:
```json
{
  "status": 400,
  "error": "Validation Failed",
  "fieldErrors": {
    "tutorName": "Tutor name is required",
    "language": "Language is required",
    "hourlyFee": "Hourly fee must be greater than zero",
    "available": "Availability is required"
  }
}
```

#### Swagger UI & OpenAPI Specification
- **Swagger UI**: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
- **OpenAPI v3 Docs**: [http://localhost:8080/v3/api-docs](http://localhost:8080/v3/api-docs)

---

## 🎨 Frontend Features & Design

- **Responsive Navigation**: Navbar with active routing indicators and mobile toggle menu.
- **Tutor Overview Dashboard**: Summary cards displaying metrics for total registered tutors, currently available tutors, and unavailable tutors.
- **Add Tutor Form**:
  - No ID input field (strictly backend-generated).
  - Client-side validation for non-empty names, languages, positive hourly fee (> 0), and availability.
  - Loading indicators while saving.
- **Tutor Directory View**:
  - Displays generated ID, tutor name, language, formatted hourly fee, and styled availability status pill badges.
  - Live search by name, language, or ID.
  - Filter by availability status (`All`, `Available only`, `Unavailable only`).
  - Refresh button (`↻ Refresh`) to re-sync data directly from the backend.
- **Edit & Update Flow**: Pre-populates existing tutor details for editing.
- **Delete Confirmation Modal**: Accessible modal dialog (`ConfirmDelete.jsx`) preventing accidental deletion.
- **Error & Empty State Resilience**:
  - Clear alerts for connection failures (`The server could not be reached...`).
  - Friendly empty state views when no tutors exist or no filter matches are found.

---

## 💻 Prerequisites & System Requirements

Ensure the following tools are installed on your machine:
- **Java JDK**: Version 21 (`java -version`)
- **Maven**: Version 3.8+ or bundled Maven Wrapper (`./mvnw` / `mvnw.cmd`)
- **Node.js**: Version 22.12+ (or 20.19+) (`node -v`)
- **npm**: Version 9+ (`npm -v`)
- **PostgreSQL Server**: Version 15+ running locally on port `5432`

---

## 🚀 Local Setup & Running Guide

### 1. Database Setup
Make sure your local PostgreSQL instance is running on port `5432` and that the database `languagetutor_db` is created. Override these environment variables when your local credentials differ:
```powershell
$env:SPRING_DATASOURCE_URL = "jdbc:postgresql://localhost:5432/languagetutor_db"
$env:SPRING_DATASOURCE_USERNAME = "postgres"
$env:SPRING_DATASOURCE_PASSWORD = "your-local-postgres-password"
```
The backend reads these values from the process environment; credentials are not stored in `application.properties`.

---

### 2. Running the Backend

Open a terminal in the `LanguageTutorBackend` directory:
```bash
# Windows Command Prompt / PowerShell:
cd LanguageTutorBackend
.\mvnw.cmd -B test
.\mvnw.cmd spring-boot:run

# Linux / macOS:
cd LanguageTutorBackend
./mvnw -B test
./mvnw spring-boot:run
```

Once started, verify:
- Console outputs: `Language Tutor Backend Application is Running ...!!!`
- Tomcat starts on port `8080`.
- Health check: `curl http://localhost:8080/api/tutors/status`
- Swagger UI: Open `http://localhost:8080/swagger-ui/index.html` in your browser.

---

### 3. Running the Frontend

Open a second terminal in the `LanguageTutorFrontend` directory:
```bash
cd LanguageTutorFrontend

# Install dependencies from the lockfile
npm ci

# Run the development server
npm run dev
```

Vite proxies `/api` requests to the backend on `http://localhost:8080`, so run the backend first. The local frontend routes use hash-based URLs so they work with both the Vite dev server and the static Docker image. The Vite dev server will launch at:
```
http://localhost:5173/
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## Run with Docker Compose

Install Docker Desktop (or Docker Engine with the Compose plugin), then run these commands from the project root:

```powershell
docker compose pull
docker compose up -d
```

Compose starts the PostgreSQL, backend, and frontend images in the same explicit service/network layout as the class example. Open the UI at [http://localhost:3000](http://localhost:3000); the browser calls the backend at [http://localhost:2025](http://localhost:2025). Port `2025` on the host maps to the Spring Boot container port `8080`; this project does not run its backend on port `2000`. PostgreSQL is available at port `5432`. The frontend image is built with `VITE_API_BASE_URL=http://localhost:2025/api` so its API calls match this host mapping.

The Compose file uses local-development PostgreSQL credentials (`postgres` / `postgres`, with database `languagetutor_db`). Replace these before using outside local development. PostgreSQL applies credentials only when its data volume is first initialized; changing the Compose values later does not change credentials in an existing volume.

The GitHub Actions workflow uses the repository secrets `LANGUAGETUTOR_USERNAME` and `LANGUAGETUTOR_TOKEN` (the secret names already configured for this repository). The username secret must be the Docker Hub account that owns the image repositories. Compose defaults to the account `dineshchandu`; if your secret contains a different username, set `LANGUAGETUTOR_USERNAME` in your shell before running Compose so its image names match the images published by Actions.

To stop the services while keeping database data, run `docker compose down`. To also delete the database volume and all tutor records in it, run `docker compose down --volumes` only when you intentionally want to reset the database.

---

## ✅ Verification & Testing Checklist

| Check | Command |
| :--- | :--- |
| Frontend lint | `cd LanguageTutorFrontend; npm ci; npm run lint` |
| Frontend production build | `cd LanguageTutorFrontend; npm run build` |
| Backend tests (with PostgreSQL running) | `cd LanguageTutorBackend; .\mvnw.cmd -B test` |
| Compose configuration | `docker compose config --quiet` |
| Pull the latest published images | `docker compose pull` |
| Start the stack | `docker compose up -d` |

---

## 🔒 Git & Ignore Policies

- Dockerfiles and `.dockerignore` files are maintained for both application services. The demonstration-style `docker-compose.yml` uses the published Docker Hub images and defines the PostgreSQL volume/network.
- A comprehensive root `.gitignore` is provided to ignore:
  - IDE metadata (`.metadata/`, `.settings/`, `.project`, `.classpath`, `.idea/`, `.vscode/`)
  - Build targets (`target/`, `dist/`, `build/`)
  - Node dependencies (`node_modules/`, debug logs)
  - Local environment files (`.env*`)
  - Temporary files and OS caches
- Each service has a `.dockerignore` so generated output, dependencies, IDE files, logs, and local environment files are excluded from Docker build contexts.
- The Docker workflow builds both service images for pushes to `main` and pull requests targeting `main`. It publishes Docker Hub images only on non-PR runs when `LANGUAGETUTOR_USERNAME` and `LANGUAGETUTOR_TOKEN` are configured as repository secrets.
