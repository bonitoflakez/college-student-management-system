// generate a userID based on user's role
const GenerateUniversityUserID = (role: string) => {
  var roleSuffix;

  if (role === "admin" || role === "Admin") {
    roleSuffix = "AD";
  } else if (role === "faculty" || role === "Faculty") {
    roleSuffix = "FC";
  } else if (role === "student" || role === "Student") {
    roleSuffix = "ST";
  } else {
    roleSuffix = null;
  }

  const numericPart = Math.floor(Math.random() * 9900000) + 100000;

  const userID = `${numericPart}${roleSuffix}`;

  return userID;
};

export { GenerateUniversityUserID };
