export function getUserLanguage(state){

const indianStatesAndLanguages = [
  { state: "Andhra Pradesh", language: "Telugu", bcp47: "te-IN" },
  { state: "Arunachal Pradesh", language: "English", bcp47: "en-IN" },
  { state: "Assam", language: "Assamese", bcp47: "as-IN" },
  { state: "Bihar", language: "Hindi", bcp47: "hi-IN" },
  { state: "Chhattisgarh", language: "Hindi", bcp47: "hi-IN" },
  { state: "Goa", language: "Konkani", bcp47: "kok-IN" },
  { state: "Gujarat", language: "Gujarati", bcp47: "gu-IN" },
  { state: "Haryana", language: "Hindi", bcp47: "hi-IN" },
  { state: "Himachal Pradesh", language: "Hindi", bcp47: "hi-IN" },
  { state: "Jharkhand", language: "Hindi", bcp47: "hi-IN" },
  { state: "Karnataka", language: "Kannada", bcp47: "kn-IN" },
  { state: "Kerala", language: "Malayalam", bcp47: "ml-IN" },
  { state: "Madhya Pradesh", language: "Hindi", bcp47: "hi-IN" },
  { state: "Maharashtra", language: "Marathi", bcp47: "mr-IN" },
  { state: "Manipur", language: "Meitei (Manipuri)", bcp47: "mni-IN" },
  { state: "Meghalaya", language: "English", bcp47: "en-IN" },
  { state: "Mizoram", language: "Mizo", bcp47: "lus-IN" },
  { state: "Nagaland", language: "English", bcp47: "en-IN" },
  { state: "Odisha", language: "Odia", bcp47: "or-IN" },
  { state: "Punjab", language: "Punjabi", bcp47: "pa-IN" },
  { state: "Rajasthan", language: "Hindi", bcp47: "hi-IN" },
  { state: "Sikkim", language: "Nepali", bcp47: "ne-IN" },
  { state: "Tamil Nadu", language: "Tamil", bcp47: "ta-IN" },
  { state: "Telangana", language: "Telugu", bcp47: "te-IN" },
  { state: "Tripura", language: "Bengali", bcp47: "bn-IN" },
  { state: "Uttar Pradesh", language: "Hindi", bcp47: "hi-IN" },
  { state: "Uttarakhand", language: "Hindi", bcp47: "hi-IN" },
  { state: "West Bengal", language: "Bengali", bcp47: "bn-IN" },
  { state: "Andaman and Nicobar Islands", language: "Hindi", bcp47: "hi-IN" },
  { state: "Chandigarh", language: "English", bcp47: "en-IN" },
  { state: "Dadra and Nagar Haveli and Daman and Diu", language: "Gujarati", bcp47: "gu-IN" },
  { state: "Delhi", language: "Hindi", bcp47: "hi-IN" },
  { state: "Jammu and Kashmir", language: "Dogri", bcp47: "doi-IN" },
  { state: "Ladakh", language: "Ladakhi", bcp47: "lbj-IN" },
  { state: "Lakshadweep", language: "Malayalam", bcp47: "ml-IN" },
  { state: "Puducherry", language: "Tamil", bcp47: "ta-IN" }
];
let detectedLanguage=""
for (let index = 0; index < indianStatesAndLanguages.length; index++) {
    if(indianStatesAndLanguages[index].state===state){
        detectedLanguage=indianStatesAndLanguages[index]
        break;
    }   
}
return detectedLanguage;
}