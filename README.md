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
- **Backend**: Spring Boot 4 REST API server connected to MySQL via Spring Data JPA and Hibernate.
- **Frontend**: Single Page Application (SPA) powered by React 19, React Router v7, Vite, and Bootstrap 5.

```
┌─────────────────────────────────┐          ┌──────────────────────────────────┐          ┌──────────────────┐
│   React SPA (Vite + Bootstrap)  │ ──HTTP──> │  Spring Boot REST API (Port 8080) │ ──JDBC──> │   MySQL Database │
│   http://localhost:5173         │ <──JSON── │  com.klef.soa.docker              │ <──────── │   Port 3306      │
└─────────────────────────────────┘          └──────────────────────────────────┘          └──────────────────┘
```

---

## 🛠 Technology Stack

### Backend
| Technology | Version / Purpose |
| :--- | :--- |
| **Java JDK** | 21+ (Java SE 21/26 compatible) |
| **Spring Boot** | 4.1.x Starter Framework |
| **Spring Data JPA** | Data Access Layer with Hibernate ORM 7.x |
| **MySQL Connector/J** | JDBC Driver for MySQL 8.x |
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
│       │   │   ├── service/                              # Service Interface Layer
│       │   │   │   ├── LanguageTutorService.java
│       │   │   │   └── impl/                             # Service Implementation Layer
│       │   │   │       └── LanguageTutorServiceImpl.java
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
   - `CorsConfig`: Enables Cross-Origin Resource Sharing for all HTTP methods (`GET`, `POST`, `PUT`, `DELETE`, `OPTIONS`).
   - `SwaggerConfig`: Initializes OpenAPI 3.0 metadata for interactive API exploration.
2. **`entity`**:
   - `LanguageTutor`: JPA Entity mapped to table `LanguageTutor_table`. Contains primary key generated via `GenerationType.IDENTITY`.
3. **`repository`**:
   - `LanguageTutorRepository`: Extends `JpaRepository<LanguageTutor, Long>` for out-of-the-box CRUD and query capabilities.
4. **`service`**:
   - `LanguageTutorService`: Defines contract for tutor management business logic.
5. **`service.impl`**:
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
- **Java JDK**: Version 21 or higher (`java -version`)
- **Maven**: Version 3.8+ or bundled Maven Wrapper (`./mvnw` / `mvnw.cmd`)
- **Node.js**: Version 18+ or 20+ (`node -v`)
- **npm**: Version 9+ (`npm -v`)
- **MySQL Server**: Version 8.0+ running locally on port `3306`

---

## 🚀 Local Setup & Running Guide

### 1. Database Setup
Make sure your local MySQL instance is running on port `3306`.
The application automatically creates the database `languagetutor_db` if it does not exist using the JDBC connection string in `LanguageTutorBackend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/languagetutor_db?createDatabaseIfNotExist=true&useSSL=false&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=root
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.hibernate.ddl-auto=update
```
*(If your local MySQL credentials differ, update `username` and `password` in `application.properties`).*

---

### 2. Running the Backend

Open a terminal in the `LanguageTutorBackend` directory:
```bash
# Windows Command Prompt / PowerShell:
cd LanguageTutorBackend
.\mvnw.cmd clean test-compile
.\mvnw.cmd spring-boot:run

# Linux / macOS:
cd LanguageTutorBackend
./mvnw clean test-compile
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

# Install dependencies (if not already installed)
npm install

# Run the development server
npm run dev
```

The Vite dev server will launch at:
```
http://localhost:5173/
```
Open [http://localhost:5173/](http://localhost:5173/) in your web browser.

---

## Run with Docker Compose

Install Docker Desktop (or Docker Engine with the Compose plugin), then run these commands from the project root:

```bash
docker compose up --build
```

Compose builds the frontend and backend images, starts MySQL with a persistent `mysql_data` volume, and waits for MySQL to become healthy before starting the backend. Open the app at [http://localhost](http://localhost). The frontend proxies `/api` requests to the backend; the backend is also available directly at `http://localhost:8080`.

The Compose file includes development-only database credential defaults. Override them with environment variables before deployment, for example:

```powershell
$env:MYSQL_PASSWORD = "your-local-password"
$env:MYSQL_ROOT_PASSWORD = "your-local-root-password"
docker compose up --build
```

To stop the services while keeping database data, run `docker compose down`. To also delete the database volume, run `docker compose down --volumes`.

---

## ✅ Verification & Testing Checklist

| Step | Verification Task | Result |
| :---: | :--- | :---: |
| **01** | **Inspect Project**: Folder structure, dependencies, layered packaging. | **PASSED** |
| **02** | **Run Backend**: Spring Boot starts on port 8080, connects to MySQL Hikari pool. | **PASSED** |
| **03** | **Test Backend APIs**: Status check, Swagger UI, display all, add tutor, display by ID, update, delete, and validation errors return HTTP 400. | **PASSED** |
| **04** | **Run Frontend**: Vite compiles and serves SPA at `http://localhost:5173/` with zero lint errors. | **PASSED** |
| **05** | **Test End-to-End**: Add records through UI without ID input, display generated IDs, refresh persistence, filter/search, and delete via confirmation modal. | **PASSED** |
| **06** | **Fix and Recheck**: Layered packages confirmed (`service.impl` implemented), old Docker files removed. | **PASSED** |
| **07** | **Approve for GitHub**: Root `.gitignore` set up, code clean and documented. | **READY** |

---

## 🔒 Git & Ignore Policies

- Dockerfiles and `.dockerignore` files are maintained for both application services, with `docker-compose.yml` at the project root.
- A comprehensive root `.gitignore` is provided to ignore:
  - IDE metadata (`.metadata/`, `.settings/`, `.project`, `.classpath`, `.idea/`, `.vscode/`)
  - Build targets (`target/`, `dist/`, `build/`)
  - Node dependencies (`node_modules/`, debug logs)
  - Temporary files and OS caches
