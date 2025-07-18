# Mini Media Portal

A lightweight prototype that mimics the core behavior of the Vyvx Media Portal (displaying tables with info from the database). Designed as a PoC for Vyvx's future migration to a modern stack.

- ### Frontend - JavaScript, HTML, CSS, React, Vite, Bootstrap
- ### Backend - Python, FastAPI, pyodbc
- ### Database - Sybase ASE via SAP ASE ODBC 64-bit Driver ("sybdrvodb64.dll")  
<br>
P.S.: You will need to create a .env file in the "backend" folder for this to work. It must include the following fields:  

- SYBASE_DRIVER={run "odbcad32" in cmd, navigate to Drivers, and get the EXACT name of the field that has file "sybdrvodb64.dll"}
- SYBASE_SERVER={link,port}
- SYBASE_DATABASE={add info}
- SYBASE_USERNAME={add info}
- SYBASE_PASSWORD={add info}
