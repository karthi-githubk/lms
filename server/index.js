// server.js

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config(); // Load environment variables from .env file

// Use process.env to access environment variables
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Destination folder for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage: storage });

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     if (
//       file.mimetype === 'application/vnd.ms-powerpoint' ||
//       file.mimetype === 'application/vnd.openxmlformats-officedocument.presentationml.presentation'
//     ) {
//       cb(null, true);
//     } else {
//       cb(new Error('Invalid file type. Only PPT files are allowed.'));
//     }
//   },
// });

function sendWelcomeEmail(email, password, name, selectedCourse) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., Gmail
    auth: {
      user: EMAIL_USER, // your email
      pass: EMAIL_PASS, // your email password
    },
  });

  const mailOptions = {
    from: "lanzkarthi@gmail.com",
    to: email,
    subject: "Welcome to Our Platform",
    text: `Hello ${name},\n\nWelcome to SmartCliff Learning Management System (LMS)!\n\nYour SmartCliff LMS account has been successfully created with the following details:\n\nName: ${name}\nEmail: ${email}\nPassword: ${password}\n\nYou have enrolled in the following course:\nCourse: ${selectedCourse}\n\nYou are now part of the SmartCliff community, where you can access a wide range of educational resources and courses. With SmartCliff LMS, you can:\n\n- Enroll in courses and enhance your knowledge.\n- Track your progress and achievements.\n- Collaborate with instructors and peers.\n- Stay updated with the latest educational content.\n\nIf you have any questions, require assistance, or need help getting started, please don't hesitate to contact our dedicated support team at support@smartcliff.com. We are here to help you on your learning journey.\n\nThank you for choosing SmartCliff LMS. We look forward to assisting you in your pursuit of knowledge and skills!\n\nBest regards,\nThe SmartCliff Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email: " + error.message);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

const db = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "karthi2211", // Replace with your MySQL password
  database: "new_schema",
});

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    },
    secret: "session- secret", // Replace with a strong secret key
  })
);

app.use("/uploads", express.static("uploads"));

app.use(express.json()); // Parse JSON requests

app.use(bodyParser.json());

app.use(
  cors({
    origin: ["http://localhost:3000"], // Replace with your frontend's origin
    methods: ["POST", "GET", "PUT", "DELETE"], // Add DELETE to the list of allowed methods
    credentials: true,
  })
);

/////////////--------------LOGIN----AUTHENTICATION-------////////////////////////////

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ Message: "Authentication Error: Token not provided" });
  } else {
    jwt.verify(token, "our-jsonwebtoken-secret-key", (err, decoded) => {
      if (err) {
        return res.status(401).json({ Message: "Authentication Error" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};
app.post("/api/register", (req, res) => {
  const { email, password, coursename } = req.body;

  // Insert login credentials into the login table
  const sqlInsertLogin =
    "INSERT INTO login (email, password, coursename ) VALUES (?, ?, ? )";
  db.query(
    sqlInsertLogin,
    [email, password, coursename],
    (error, loginResult) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ Message: "Internal Server Error" });
      }

      return res.json({ Message: "User registered successfully!" });
    }
  );
});

app.get("/", verifyUser, (req, res) => {
  return res.json({ Status: "Success", email: req.email });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  /////---------------Servrside validation-User----------///////////

  if (!email || !email.match(emailRegex)) {
    return res.status(400).json({ error: "Email is required." });
  }
  ////////////////--------------------------/////////////////////////

  const sql = "SELECT * FROM login WHERE `email`=? AND `password`=?";
  db.query(sql, [req.body.email, req.body.password], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Server-side error" });
    }

    if (data.length > 0) {
      const email = data[0].email;
      const token = jwt.sign({ email }, "our-jsonwebtoken-secret-key", {
        expiresIn: "1d",
      });
      res.cookie("token", token, { httpOnly: true });
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Message: "No records existed" });
    }
  });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

const adminSecretKey = "admin-secret-key";

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.token; // Assuming you're using a library like 'cookie-parser' to parse cookies
  const sessionId = req.cookies["connect.sid"]; // Access the 'connect.sid' cookie

  if (!token || !sessionId) {
    return res
      .status(401)
      .json({
        Message: "Authentication Error: Token or Session ID not provided",
      });
  } else {
    jwt.verify(token, adminSecretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({ Message: "Authentication Error" });
      } else {
        req.email = decoded.email;
        // You can also use 'sessionId' here if needed
        next();
      }
    });
  }
};

const emailRegex =
  /^(?=.[a-zA-Z])[a-zA-Z0-9._%+-][a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]{2,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;

app.post("/api/admin/login", (req, res) => {
  const { email, password } = req.body;

  /////---------------------Servrside validation-Admin-----///////////

  if (!email || !email.match(emailRegex)) {
    return res.status(400).json({ error: "Email is required." });
  }
  ////-----------------------------------------/////////////////

  // Query the database to check if the email and password match
  db.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ Message: "Server-side error" });
      }

      if (results.length > 0) {
        const email = results[0].email;
        const token = jwt.sign({ email }, adminSecretKey, { expiresIn: "1d" });

        // Set the 'token' cookie
        res.cookie("token", token, { httpOnly: true });

        return res.json({ Status: "Success" });
      } else {
        return res.status(401).json({ Message: "Authentication Failed" });
      }
    }
  );
});

app.get("/api/admin/check-auth", verifyAdmin, (req, res) => {
  // You can access 'token' and 'connect.sid' cookies from req.cookies
  const token = req.cookies.token;
  const sessionId = req.cookies["connect.sid"];

  // Now you can use these cookies as needed
  if (token && sessionId) {
    return res.json({ Status: "Success", email: req.email });
  } else {
    return res
      .status(401)
      .json({
        Message: "Authentication Error: Token or Session ID not provided",
      });
  }
});

app.post("/api/admin/logout", (req, res) => {
  // Clear both 'token' and 'connect.sid' cookies on the server-side
  res.clearCookie("token");
  res.clearCookie("connect.sid"); // Clear the connect.sid cookie

  // You can also clear cookies on the client-side using JavaScript
  // This will ensure the cookies are removed from the client's browser as well
  res.cookie("token", "", { expires: new Date(0) });
  res.cookie("connect.sid", "", { expires: new Date(0) });

  // Destroy the session (assuming you are using express-session)
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ Message: "Server-side error" });
    }
    return res.json({ Status: "Success" });
  });
});

//////////???????????????-------------------////////////

////-----------------------?????/---USERMANAGE____?????????//?////////////////

app.get("/api/user/get", (req, res) => {
  const sqlGet = `
    SELECT contact_db.*, courses.coursename AS coursename
    FROM contact_db
    LEFT JOIN courses ON contact_db.course_id = courses.id
  `;
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching users.");
    }
    res.send(result);
  });
});

// API endpoint to add a user
app.post("/api/user/post", (req, res) => {
  try {
    const { name, email, contact, gender, dob, coursename, password } =
      req.body;

    const usernameRegex = /^[A-Za-z][a-zA-Z\s.]{2,}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[#@]).{6,}$/;
    const emailRegex =
      /^(?=.*[a-zA-Z])[a-zA-Z0-9._%+-]*[a-zA-Z][a-zA-Z0-9._%+-]*@[a-zA-Z]{2,}\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    const MobileNumberPattern = /^(?:\+91[\s-]?)?[6789]\d{9}$/;
    if (!name) {
      return res.status(400).json({ error: "Username is required." });
    }

    if (!name.match(usernameRegex)) {
      return res
        .status(400)
        .json({
          error:
            "Username must contain only letters and an optional single dot.",
        });
    }
    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    if (!email.match(emailRegex)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    if (!password) {
      return res.status(400).json({ error: "Password is required." });
    }

    if (!password.match(passwordRegex)) {
      return res
        .status(400)
        .json({
          error:
            "Password must contain at least one uppercase letter, one lowercase letter, one number, one of the special characters (@, $, ., or #), and be at least 8 characters long.",
        });
    }

    if (!contact) {
      return res.status(400).json({ error: "contact is required." });
    }

    if (!contact.match(MobileNumberPattern)) {
      return res
        .status(400)
        .json({ error: "number must be valid indian mobile number" });
    }

    if (!gender) {
      return res.status(400).json({ error: "gender is required." });
    }
    if (!coursename) {
      return res.status(400).json({ error: "course name is required." });
    }

    // Insert the user into the database
    const sqlInsert =
      "INSERT INTO contact_db (name, email, contact, gender, dob, course_id, password) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sqlInsert,
      [name, email, contact, gender, dob, coursename, password],
      (err, result) => {
        if (err) {
          console.error("Error inserting user: " + err.message);
          return res.status(500).json({ error: "Error inserting user" });
        }

        // Retrieve the course name based on the coursename (assuming coursename is the course ID)
        const sqlGetCourseName = "SELECT coursename FROM courses WHERE id = ?";
        db.query(sqlGetCourseName, [coursename], (error, courseResult) => {
          if (error) {
            console.error("Error fetching course name: " + error.message);
            // Handle the error here
          }

          const selectedCourse = courseResult[0].coursename;

          // Send a welcome email to the newly registered user with the selected course information
          sendWelcomeEmail(email, password, name, selectedCourse);

          res.status(200).json({ message: "User added successfully" });
        });
      }
    );
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

// API endpoint to delete a user
app.delete("/api/user/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM contact_db WHERE ID = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting user" });
    } else {
      console.log("User deleted successfully");
      res.status(200).json({ message: "User deleted successfully" });
    }
  });
});

// API endpoint to get a user by ID
app.get("/api/user/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = `
    SELECT contact_db.*, courses.coursename
    FROM contact_db
    LEFT JOIN courses ON contact_db.course_id = courses.id
    WHERE contact_db.ID = ?
  `;
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching user by ID" });
    } else {
      res.send(result);
    }
  });
});

app.put("/api/user/update/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email, contact, gender, dob, password } = req.body;

  const sqlUpdate =
    "UPDATE contact_db SET name = ?, email = ?, contact = ?, gender = ?, dob = ?, password = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [name, email, contact, gender, dob, password, id],
    async (err, result) => {
      if (err) {
        console.error("Error updating user: " + err.message);
        res.status(500).json({ error: "Error updating user" });
      } else {
        console.log("User updated successfully");

        // Send an email to the user to notify them of the update
        try {
          const transporter = nodemailer.createTransport({
            service: "Gmail", // e.g., Gmail, SMTP, etc.
            auth: {
              user: EMAIL_USER,
              pass: EMAIL_PASS,
            },
          });

          const mailOptions = {
            from: "lanzkarthi@gmail.com",
            to: email, // The user's email address
            subject: "User Information Updated",
            text: `Dear ${name},\n\nYour user information has been updated .\n\nUpdated Information:\nName: ${name}\nEmail: ${email}\nContact: ${contact}\nGender: ${gender}\nDate of Birth: ${dob}`,
          };

          await transporter.sendMail(mailOptions);
          console.log("Email sent to notify user of the update");
        } catch (emailError) {
          console.error("Error sending email: " + emailError.message);
          // Handle email sending errors here
        }

        res.status(200).json({ message: "User updated successfully" });
      }
    }
  );
});

///////////???????????-----------forgot---password-----///////////////////////

// API endpoint to check if an email exists and send a password reset email
app.post("/api/user/check-email", (req, res) => {
  const { email } = req.body;
  const sqlCheckEmail = "SELECT name, password FROM contact_db WHERE email = ?";

  db.query(sqlCheckEmail, [email], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error checking email existence" });
    }

    if (result && result.length > 0) {
      // Email exists, retrieve the username and password
      const user = result[0];
      const username = user.name;
      const existingPassword = user.password;

      // Send the existing password in the email with the username
      sendExistingPasswordEmail(username, email, existingPassword);

      res.status(200).json({ success: true });
    } else {
      // Email not found in the database
      res.status(404).json({ exists: false });
    }
  });
});

// Implement a function to send the existing password in the email with the username
function sendExistingPasswordEmail(username, email, existingPassword) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "lanzkarthi@gmail.com",
    to: email,
    subject: "Your Password Reset Information",
    text: `Dear ${username},
    
  We received a request that you have forgotten your password for your SmartCliff LMS account.
  
  Here are your login details:
  Username: ${username}
  Your Password: ${existingPassword}
  
  Please use this password to log in to your account. We recommend changing your password after logging in for security reasons.
  
  If you didn't request a password reset or have any concerns, please contact our support team immediately.
  
  Best regards,
  SmartCliff Team`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      // Handle email sending error
    } else {
      console.log("Password email sent: " + info.response);
    }
  });
}

//////////-????????????///-----------////////////////////////

////-------ROLE---///////////////////

app.get("/api/admin/get", (req, res) => {
  const sqlGet = `SELECT * FROM admin`;
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching users.");
    }
    res.send(result);
  });
});

app.post("/api/admin/post", (req, res) => {
  try {
    const { name, email, contact, password, gender, dob } = req.body;
    const sqlInsert =
      "INSERT INTO admin (name, email, contact,password, gender, dob ) VALUES (?, ?, ?, ?, ?, ?)";

    db.query(
      sqlInsert,
      [name, email, contact, password, gender, dob],
      (err, result) => {
        if (err) {
          console.error("Error inserting user: " + err.message);
          return res.status(500).json({ error: "Error inserting user" });
        }
        console.log("User inserted successfully");
        res.status(200).json({ message: "User inserted successfully" });
      }
    );
  } catch (error) {
    console.error("Error: " + error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.delete("/api/admin/remove/:adminId", (req, res) => {
  const { adminId } = req.params;
  const sqlRemove = "DELETE FROM admin WHERE adminId = ?";
  db.query(sqlRemove, adminId, (error, result) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: "Error deleting user" });
    } else {
      console.log("User deleted successfully");
      res.status(200).json({ message: "User deleted successfully" });
    }
  });
});

////////////////-----------COURSE-------------------////////////////

app.get("/api/course/get", (req, res) => {
  const sqlGet = "SELECT * FROM courses";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching courses.");
    }
    res.send(result);
  });
});

app.delete("/api/course/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM courses WHERE ID = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error deleting course.");
    }
    res.status(200).send("Course deleted successfully.");
  });
});

app.get("/api/course/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM courses WHERE ID = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching course by ID.");
    }
    res.send(result);
  });
});

app.post("/api/course/post", upload.single("courseimg"), (req, res) => {
  const { coursename, course_desc } = req.body;
  const courseimgPath = req.file.path; // Get the local file path

  // Save file metadata and path in the database
  const sqlInsert =
    "INSERT INTO courses(coursename, course_desc, courseimg) VALUES (?, ?, ?)";
  db.query(
    sqlInsert,
    [coursename, course_desc, courseimgPath],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error inserting course data.");
      }
      res.status(200).send("Course added successfully.");
    }
  );
});

app.put("/api/course/update/:id", upload.single("courseimg"), (req, res) => {
  const { id } = req.params;
  const { coursename, course_desc } = req.body;
  const courseimgPath = req.file.path; // Get the local file path

  const sqlUpdate =
    "UPDATE courses SET coursename = ?, course_desc = ?, courseimg = ? WHERE ID = ?";
  db.query(
    sqlUpdate,
    [coursename, course_desc, courseimgPath, id],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error updating course data.");
      }
      res.status(200).send("Course updated successfully.");
    }
  );
});

////////////////_/////////---------------------------////////////////

//////////////////-----------MODULES-----------------//////

// Endpoint to retrieve all modules
app.get("/api/modules/get", (req, res) => {
  const sqlGet =
    "SELECT modules.*, courses.coursename AS course_name FROM modules LEFT JOIN courses ON modules.course_id = courses.id";
  db.query(sqlGet, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching modules.");
    }
    res.json(result);
  });
});

// Add routes for modules
app.post("/api/modules/post", upload.single("module_img"), (req, res) => {
  const { module_name, module_desc, course_id } = req.body;
  const moduleimgPath = req.file.path;

  const sqlInsert =
    "INSERT INTO modules (module_name, module_desc, module_img, course_id) VALUES (?, ?, ?, ?)";
  db.query(
    sqlInsert,
    [module_name, module_desc, moduleimgPath, course_id],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error inserting module data.");
      }
      res.status(200).send("Module added successfully.");
    }
  );
});

// Endpoint to update a module by ID
app.put("/api/modules/update/:id", upload.single("module_img"), (req, res) => {
  const { id } = req.params;
  const { module_name, module_desc, course_id } = req.body;
  const moduleimgPath = req.file.path;

  const sqlUpdate =
    "UPDATE modules SET module_name = ?, module_desc = ?, module_img = ?, course_id = ? WHERE id = ?";
  db.query(
    sqlUpdate,
    [module_name, module_desc, moduleimgPath, course_id, id],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error updating module data.");
      }
      res.status(200).send("Module updated successfully.");
    }
  );
});

app.get("/api/modules/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM modules WHERE ID = ?";
  db.query(sqlGet, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error fetching module by ID.");
    }
    res.send(result);
  });
});

// Endpoint to delete a module by ID
app.delete("/api/modules/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM modules WHERE id = ?";
  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Error deleting module.");
    }
    res.status(200).send("Module deleted successfully.");
  });
});

/////////////////////////////----Topics----Updated-------------///////////////

// GET Endpoint to retrieve all topics
app.get("/api/topics/get", (req, res) => {
  const sqlGet = `
    SELECT 
      topics.*,
      modules.module_name AS module_name,
      courses.coursename AS course_name
    FROM topics
    LEFT JOIN modules ON topics.module_id = modules.id
    LEFT JOIN courses ON modules.course_id = courses.id
  `;

  db.query(sqlGet, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching topics." });
    }

    res.json(results);
  });
});

// POST Endpoint to add a new topic
app.post(
  "/api/topics/post",
  upload.fields([
    { name: "pdf_file" },
    { name: "video_file" },
    { name: "ppt_file" },
  ]),
  (req, res) => {
    const {
      module_id,
      topic_name,
      topic_desc,
      low,
      medium,
      hard,
      lowDescription,
      mediumDescription,
      hardDescription,
      lowTestCases,
      mediumTestCases,
      hardTestCases,
    } = req.body;
    const pdfFilePath = req.files["pdf_file"][0].path;
    const videoFilePath = req.files["video_file"][0].path;
    const pptFilePath = req.files["ppt_file"][0].path;
    if (
      !module_id ||
      !topic_name ||
      !topic_desc ||
      !pdfFilePath ||
      !videoFilePath ||
      low === undefined ||
      medium === undefined ||
      hard === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Please provide a value for each input field." });
    }

    const sqlInsert = `
  INSERT INTO topics 
  (module_id, topic_name, topic_desc, pdf_file, video_file, low, medium, hard, 
  low_description, medium_description, hard_description, low_test_case, medium_test_case, hard_test_case,ppt_file) 
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
`;

    db.query(
      sqlInsert,
      [
        module_id,
        topic_name,
        topic_desc,
        pdfFilePath,
        videoFilePath,
        low,
        medium,
        hard,
        lowDescription,
        mediumDescription,
        hardDescription,
        JSON.stringify(lowTestCases),
        JSON.stringify(mediumTestCases),
        JSON.stringify(hardTestCases),
        pptFilePath,
      ],
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Error adding topic." });
        }

        res.status(200).json({ message: "Topic added successfully." });
      }
    );
  }
);

// PUT Endpoint to update a topic by ID
app.put(
  "/api/topics/update/:id",
  upload.fields([{ name: "pdf_file" }, { name: "video_file" }]),
  (req, res) => {
    const { id } = req.params;
    const { module_id, topic_name, topic_desc, low, medium, hard } = req.body;
    const pdfFilePath = req.files["pdf_file"][0].path;
    const videoFilePath = req.files["video_file"][0].path;

    if (
      !module_id ||
      !topic_name ||
      !topic_desc ||
      !pdfFilePath ||
      !videoFilePath ||
      low === undefined ||
      medium === undefined ||
      hard === undefined
    ) {
      return res
        .status(400)
        .json({ error: "Please provide a value for each input field." });
    }

    const sqlUpdate =
      "UPDATE topics SET module_id = ?, topic_name = ?, topic_desc = ?, pdf_file = ?, video_file = ?, low = ?, medium = ?, hard = ? WHERE id = ?";

    db.query(
      sqlUpdate,
      [
        module_id,
        topic_name,
        topic_desc,
        pdfFilePath,
        videoFilePath,
        low,
        medium,
        hard,
        id,
      ],
      (error, result) => {
        if (error) {
          console.error(error);
          return res.status(500).json({ error: "Error updating topic." });
        }

        res.status(200).json({ message: "Topic updated successfully." });
      }
    );
  }
);

// GET Endpoint to retrieve a topic by ID
app.get("/api/topics/get/:id", (req, res) => {
  const { id } = req.params;
  const sqlGet = "SELECT * FROM topics WHERE id = ?";

  db.query(sqlGet, id, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching topic by ID." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Topic not found." });
    }

    res.json(results[0]);
  });
});

// DELETE Endpoint to remove a topic by ID
app.delete("/api/topics/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM topics WHERE id = ?";

  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting topic." });
    }

    res.status(200).json({ message: "Topic deleted successfully." });
  });
});

///-------?????????????!!---------TOPIC MCQ_________________???????//////

// GET Endpoint to retrieve MCQ questions
app.get("/api/mcq_questions/get", (req, res) => {
  const sqlGet = `
    SELECT 
      mcq_questions.*,
      topics.topic_name AS topic_name
    FROM mcq_questions
    LEFT JOIN topics ON mcq_questions.topic_id = topics.id
  `;

  db.query(sqlGet, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching MCQ questions." });
    }

    res.json(results);
  });
});

// POST Endpoint to add a new MCQ question
app.post("/api/mcq_questions/add", (req, res) => {
  const questions = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "Invalid data provided." });
  }

  const sqlInsert =
    "INSERT INTO mcq_questions (topic_id, question, option_1, option_2, option_3, option_4, correct_option) VALUES ?";

  const values = questions.map((q) => [
    q.topic_id,
    q.question,
    q.option_1,
    q.option_2,
    q.option_3,
    q.option_4,
    q.correct_option,
  ]);

  db.query(sqlInsert, [values], (error, result) => {
    if (error) {
      console.error("Error adding MCQ questions:", error);
      return res.status(500).json({ error: "Error adding MCQ questions." });
    }

    res.status(200).json({ message: "MCQ questions added successfully." });
  });
});

// PUT Endpoint to update an MCQ question by ID
app.put("/api/mcq_questions/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    topic_id,
    question,
    option_1,
    option_2,
    option_3,
    option_4,
    correct_option,
  } = req.body;

  if (
    !topic_id ||
    !question ||
    !option_1 ||
    !option_2 ||
    !option_3 ||
    !option_4 ||
    !correct_option
  ) {
    return res
      .status(400)
      .json({ error: "Please provide a value for each input field." });
  }

  const sqlUpdate =
    "UPDATE mcq_questions SET topic_id = ?, question = ?, option_1 = ?, option_2 = ?, option_3 = ?, option_4 = ?, correct_option = ? WHERE id = ?";

  db.query(
    sqlUpdate,
    [
      topic_id,
      question,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option,
      id,
    ],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error updating MCQ question." });
      }

      res.status(200).json({ message: "MCQ question updated successfully." });
    }
  );
});

// GET Endpoint to retrieve an MCQ question by ID
app.get("/api/mcq_questions/getById/:id", (req, res) => {
  const { id } = req.params;
  const sqlGetById = "SELECT * FROM mcq_questions WHERE id = ?";

  db.query(sqlGetById, id, (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error fetching MCQ question by ID." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "MCQ question not found." });
    }

    res.json(result[0]);
  });
});

// DELETE Endpoint to remove an MCQ question by ID
app.delete("/api/mcq_questions/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM mcq_questions WHERE id = ?";

  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting MCQ question." });
    }

    res.status(200).json({ message: "MCQ question deleted successfully." });
  });
});

///////////////////------------Modules Mcq's--------------------/////////////

// GET Endpoint to retrieve MCQ questions
app.get("/api/modulemcq/get", (req, res) => {
  const sqlGet = `
    SELECT 
    modulemcq.*,
      modules.module_name AS module_name
    FROM modulemcq
    LEFT JOIN modules ON modulemcq.module_id = modules.id
  `;

  db.query(sqlGet, (error, results) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error fetching MCQ questions." });
    }

    res.json(results);
  });
});

// POST Endpoint to add a new MCQ question
app.post("/api/modulemcq/add", (req, res) => {
  const questions = req.body;

  if (!Array.isArray(questions) || questions.length === 0) {
    return res.status(400).json({ error: "Invalid data provided." });
  }

  const sqlInsert =
    "INSERT INTO modulemcq (module_id, question, option_1, option_2, option_3, option_4, correct_option) VALUES ?";

  const values = questions.map((q) => [
    q.module_id,
    q.question,
    q.option_1,
    q.option_2,
    q.option_3,
    q.option_4,
    q.correct_option,
  ]);

  db.query(sqlInsert, [values], (error, result) => {
    if (error) {
      console.error("Error adding MCQ questions:", error);
      return res.status(500).json({ error: "Error adding MCQ questions." });
    }

    res.status(200).json({ message: "MCQ questions added successfully." });
  });
});

// PUT Endpoint to update an MCQ question by ID
app.put("/api/modulemcq/update/:id", (req, res) => {
  const { id } = req.params;
  const {
    module_id,
    question,
    option_1,
    option_2,
    option_3,
    option_4,
    correct_option,
  } = req.body;

  if (
    !module_id ||
    !question ||
    !option_1 ||
    !option_2 ||
    !option_3 ||
    !option_4 ||
    !correct_option
  ) {
    return res
      .status(400)
      .json({ error: "Please provide a value for each input field." });
  }

  const sqlUpdate =
    "UPDATE modulemcq SET module_id = ?, question = ?, option_1 = ?, option_2 = ?, option_3 = ?, option_4 = ?, correct_option = ? WHERE id = ?";

  db.query(
    sqlUpdate,
    [
      module_id,
      question,
      option_1,
      option_2,
      option_3,
      option_4,
      correct_option,
      id,
    ],
    (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Error updating MCQ question." });
      }

      res.status(200).json({ message: "MCQ question updated successfully." });
    }
  );
});

// GET Endpoint to retrieve an MCQ question by ID
app.get("/api/modulemcq/getById/:id", (req, res) => {
  const { id } = req.params;
  const sqlGetById = "SELECT * FROM modulemcq WHERE id = ?";

  db.query(sqlGetById, id, (error, result) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error fetching MCQ question by ID." });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "MCQ question not found." });
    }

    res.json(result[0]);
  });
});

// DELETE Endpoint to remove an MCQ question by ID
app.delete("/api/modulemcq/remove/:id", (req, res) => {
  const { id } = req.params;
  const sqlRemove = "DELETE FROM modulemcq WHERE id = ?";

  db.query(sqlRemove, id, (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error deleting MCQ question." });
    }

    res.status(200).json({ message: "MCQ question deleted successfully." });
  });
});

//////////////////////////////?????????????----------------------/////////////

////////////--------------NOTIFICATION--------------??????///

app.post("/api/notification", (req, res) => {
  const formData = req.body;

  // Insert the form data into the "notification" table
  const sql = "INSERT INTO notification SET ?";
  db.query(sql, formData, (err, result) => {
    if (err) {
      console.error("Error inserting data into MySQL:", err);
      res
        .status(500)
        .json({ message: "An error occurred while saving the data." });
    } else {
      console.log("Data inserted into MySQL:", result);
      res.status(200).json({ message: "Data saved successfully." });
    }
  });
});

app.get("/api/notification", (req, res) => {
  // Retrieve data from the "notification" table
  const sql = "SELECT * FROM notification";
  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching data from MySQL:", err);
      res
        .status(500)
        .json({ message: "An error occurred while fetching the data." });
    } else {
      // console.log("Data fetched from MySQL:", );
      res.status(200).json(results);
    }
  });
});

////////////-------------////////////////

///////////-------Import Excel-----///////////////

app.post("/api/user/import", async (req, res) => {
  const data = req.body.data;

  if (!data || !Array.isArray(data) || data.length === 0) {
    return res.status(400).json({ error: "Invalid data format" });
  }

  const sql =
    "INSERT INTO contact_db (name, email, contact, gender, dob, password) VALUES " +
    data.map(() => "(?, ?, ?, ?, ?, ?)").join(", "); // Generate placeholders for each row

  const values = [];

  data.forEach((user) => {
    if (
      user.Name &&
      user.Email &&
      user.Contact &&
      user.Gender &&
      user["Date Of Birth"] && // Assuming 'Date Of Birth' is the field in your Excel sheet
      user.Password
    ) {
      const dateOfBirth = user["Date Of Birth"];

      // Check if dateOfBirth is a string before splitting
      if (typeof dateOfBirth === "string") {
        const dateParts = dateOfBirth.split("/");
        if (dateParts.length === 3) {
          const formattedDob = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
          values.push([
            user.Name,
            user.Email,
            user.Contact,
            user.Gender,
            formattedDob,
            user.Password,
          ]);
        } else {
          console.error(`Invalid date format: ${dateOfBirth}`);
        }
      } else {
        console.error(`Invalid date format: ${dateOfBirth}`);
      }
    } else {
      console.error(`Incomplete or missing data: ${JSON.stringify(user)}`);
    }
  });

  if (values.length === 0) {
    return res.status(400).json({ error: "No valid data to insert" });
  }

  const flattenedValues = values.flat(); // Flatten the array of arrays

  db.query(sql, flattenedValues, async (err, results) => {
    if (err) {
      console.error("Error inserting data:", err);
      res.status(500).json({ error: "Error inserting data" });
    } else {
      console.log("Data inserted successfully");
      // Send a welcome email to each user
      for (const user of data) {
        const { Email, Password, Name } = user;
        await sendWelcomeEmail(Email, Password, Name);
      }
      res.status(200).json({ message: "Data inserted successfully" });
    }
  });
});

// Function to send the welcome email
async function sendWelcomeEmail(email, password, name) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., Gmail
    auth: {
      user: EMAIL_USER, // your email
      pass: EMAIL_PASS, // your email password
    },
  });

  const mailOptions = {
    from: "r.kannan0621@gmail.com",
    to: email,
    subject: "Welcome to Your App",
    text: `Hello ${name},\n\nWelcome to SmartCliff Learning Management System (LMS)!\n\nYour SmartCliff LMS account has been successfully created with the following details:\n\nName: ${name}\nEmail: ${email}\nPassword: ${password}\n\nYou have enrolled in the following, You are now part of the SmartCliff community, where you can access a wide range of educational resources and courses. With SmartCliff LMS, you can:\n\n- Enroll in courses and enhance your knowledge.\n- Track your progress and achievements.\n- Collaborate with instructors and peers.\n- Stay updated with the latest educational content.\n\nIf you have any questions, require assistance, or need help getting started, please don't hesitate to contact our dedicated support team at support@smartcliff.com. We are here to help you on your learning journey.\n\nThank you for choosing SmartCliff LMS. We look forward to assisting you in your pursuit of knowledge and skills!\n\nBest regards,\nThe SmartCliff Team`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email}`);
  } catch (error) {
    console.error(`Error sending welcome email to ${email}:`, error);
  }
}

////////////-------???????---------------//////////////////

app.listen(5000, () => {
  console.log("Server running at port 5000!");
});
