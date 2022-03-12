const querystring = require("querystring");

exports.getUserFromGoogle = () => {
  // gets user from Google with authorization code
};

exports.getGoogleAuthUrl = () => {
  const baseUrl = "https://accounts.google.com/o/oauth2//v2/auth";
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
