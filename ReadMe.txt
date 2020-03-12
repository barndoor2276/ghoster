How to run the application:
1. run "npm install"
2. Open ./src/config/config.json.ts and edit:
    a. app.host - The machine that is acting as the passthrough (your laptop)
    b. targetapp.host - The machine that you are trying to access (server of the WAS)
    c. targetapp.basePath - The path to the WAS
    d. targetApp.caFile - The path to the Certificate file. Needs to be a pem and can be found in the series 5000 repo (...\tc-application-series5000\SystemServices\dev-tools\certs\Augustus_CA_Chain_Base64_exp_03_10_2029.pem)
3. run "npm run start"
4. "Listening at <TheHostYouEntered>:9990" should appear
5. Set the WAS on your device to http://<TheHostYouEntered>:9990