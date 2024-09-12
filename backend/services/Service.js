const languageCode = {
    c: 50,
    cpp: 54,
    java: 91,
    javascript: 97,
    python: 92
}

const getSubmission = async (tokenId, callBack) => {
    const url = `https://judge0-ce.p.rapidapi.com/submissions/${tokenId}?base64_encoded=true&fields=*`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'e423bece32msh1aaddc0aa3a721bp1f6d11jsne26bb0b25c8b',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
    } catch (error) {
        callBack({ apiStatus: 'error', message: JSON.stringify(error) })
        console.error({ error });
    }
}

export const MakeSUbmission = async ({ code, language, callback, stdin }) => {
    const url = "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=false&fields=*"

    const httpOptions = {
        method: 'POST',
        headers: {
            'x-rapidapi-key': 'e423bece32msh1aaddc0aa3a721bp1f6d11jsne26bb0b25c8b',
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            language_id: languageCode[language],
            source_code: btoa(code),
            stdin: btoa(stdin)
        })
    };

    try {
        callback({ apiStatus: 'loading' });
        const response = await fetch(url, httpOptions);
        const result = response.json();
        const tokenId = result.token;
        let statusCode = 1;
        let apiSubmissionResult;
        while (statusCode === 1 || statusCode === 2) {
            try {
                apiSubmissionResult = await getSubmission(tokenId);
                statusCode = apiSubmissionResult.status.id;
            } catch (error) {
                callback({ apiStatus: 'error', message: JSON.stringify(error) })
                return;
            }
        }

        if(apiSubmissionResult){
            callback({apiStatus: 'success', data: apiSubmissionResult})
        }
    } catch (error) {
        callback({
            apiStatus: 'error',
            message: JSON.stringify(error)
        })
    }
}