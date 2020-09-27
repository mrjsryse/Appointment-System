*** Settings ***
Library  SeleniumLibrary    run_on_failure=NOTHING

*** Variables ***
${SERVER}         localhost:3000
${BROWSER}        Chrome
${DELAY}         1
${ASAP}          0
${VALID ADMIN}     admin
${VALID SECRETARY}     secretary
${VALID DENTIST}     buchanan
${VALID PASSWORD}    1234567890
${LOGIN URL}      http://${SERVER}/login
${ADMIN URL}    http://${SERVER}/admin
${SECRETARY URL}    http://${SERVER}/secretary
${DENTIST URL}    http://${SERVER}/dentist

*** Keywords ***
Open Browser To Login Page Slow
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${DELAY}
    Login Page should be Open

Open Browser To Login Page
    Open Browser    ${LOGIN URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${ASAP}
	
Open Browser To Secretary Page Slow
    Open Browser    ${SECRETARY URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${DELAY}
	
Open Browser To Secretary Page
    Open Browser    ${SECRETARY URL}    ${BROWSER}
    Maximize Browser Window
    Set Selenium Speed  ${ASAP}

Go To Login Page
    Go To   ${LOGIN URL}
    Login Page Should Be Open

Input Username
    [Arguments]     ${username}
    Input Text    username    ${username}

Input Password
    [Arguments]    ${password}
    Input Text    password    ${password}

Submit Credentials
    Click Button    submit

Login Page Should Be Open
    Location Should Be    ${LOGIN URL}
    Title Should Be     Access Dental Clinic | Login

Admin Page Should Be Open
    Location Should Be    ${ADMIN URL}
    Title Should Be    Access Dental Clinic | Admin

Secretary Page Should Be Open
    Location Should Be    ${SECRETARY URL}
    Title Should Be    Access Dental Clinic | Secretary

Dentist Page Should Be Open
    Location Should Be    ${DENTIST URL}
    Title Should Be    Access Dental Clinic | Dentist

Logout Page
    Click Element    logoutButton