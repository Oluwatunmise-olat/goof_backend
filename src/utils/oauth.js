const querystring = require("querystring");

// Change to a class

exports.getUserFromGoogle = () => {
  // gets user from Google with authorization code
};

exports.getGoogleAuthUrl = () => {
  // returns the google auth constent uri
  const baseUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const config = {
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ].join(" ")
  };
  return `${baseUrl}?${querystring.stringify(config)}`;
};

exports.getTokens = async (code) => {
  /**
   * Using authorization code from user
   * we make a call to googleapis to get access token and id token
   */
  const baseUrl = "https://oauth2.googleapis.cocm/token";
  const config = {
    code,
    client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
    grant_type: "authorization_code"
  };
  return await axios.post(baseUrl, config, {
    headers: {
      "Content-Type": "application/json"
    }
  });
};
