# Description

This is a web-based research cell database system, created as a software engineering project. It aims to provide a simple, cross-platform, responsive frontend for interacting with a database of research papers submitted by the employees of a company.

# Overview

The database has a single table, `papers`, with the following columns:

- Employee ID
- Employee Name
- Email Address
- Paper Title
- Journal Name
- Publication Year

The interface has two modes:

- Browse: For vieweing the records
- Submit: For submitting a new record
 
A navbar at the top of the interface has links for switching between these two modes.

In browse mode, a table containing all the records is displayed to the user.

In submit mode, the user is served a form with fields corresponding the columns of the `papers` table. The user can choose to fill up and submit this form. The user input is subsequently validated, and if everything goes well, a new record should be appended to the table. The next time the user accesses browse mode, this new record will be displayed at the end.

# Dependencies

## Backend

The backend is a simple server for serving the frontend over http and interacting with the sqlite database.

**Toolchains**

- [rust-nightly](https://github.com/rust-lang/rust)

**Utilities**

- [cargo](https://github.com/rust-lang/cargo)
- [cargo-make](https://github.com/sagiegurari/cargo-make)
- [diesel-cli](https://github.com/diesel-rs/diesel/tree/master/diesel_cli)
- [sqlite](https://github.com/sqlite/sqlite)

**Libraries and Frameworks**

- [rocket](https://github.com/SergioBenitez/Rocket)
- [diesel](https://github.com/diesel-rs/diesel)
- [serde](https://github.com/serde-rs/serde)
- [dotenvy](https://github.com/allan2/dotenvy)

## Frontend

The frontend is a standard typescript app which fetches data from the backend at runtime.

**Toolchains**

- [typescript](https://github.com/microsoft/TypeScript)
- [sass](https://github.com/sass/sass)
- [webpack](https://github.com/webpack/webpack)

**Utilities**

- [npm](https://github.com/npm/cli)
- [webpack-cli](https://github.com/webpack/webpack-cli)

**Libraries and Frameworks**

- [redom](https://github.com/redom/redom)
- [pure.css](https://github.com/pure-css/pure)
- [scenejs](https://github.com/daybrush/scenejs)
- [sweetalert2](https://github.com/sweetalert2/sweetalert2)

# Building and Setting Up

> This section is under construction

# SRS and DFD Documents

> Links to be added soon
